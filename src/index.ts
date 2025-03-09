import Fastify from "fastify";
import fs from "fs";
import path from "path";
import fastifyHttpProxy from "@fastify/http-proxy";

const configPath = path.join(__dirname, "../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

const servers: string[] = config.servers;
let current = 0;

function getNextServer(): string {
  const server = servers[current];
  current = (current + 1) % servers.length;
  return server;
}

fastify.addHook("onRequest", (request, reply, done) => {
  const { method, url, headers, ip } = request;
  const target = getNextServer();

  fastify.log.info({
    msg: "Nova requisição recebida",
    method,
    url,
    ip,
    headers,
    encaminhadoPara: target,
  });

  done();
});

fastify.register(fastifyHttpProxy, {
  upstream: "",
  prefix: "/",
  rewritePrefix: "/",
  http2: false,
  replyOptions: {
    getUpstream: () => getNextServer(),
  },
});

fastify.listen({ port: config.port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`🚀 Load balancer rodando em ${address}`);
});
