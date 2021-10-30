import * as express from "express";
import * as http from "http";
import { Environment } from "./config/environment";

class Server {
  public app: express.Application;
  // public server: http.Server;
  public port = process.env.PORT || 9000;

  constructor() {
    this.app = express.default();
  }

  /**
   * Run the server backend
   */
  public run(): void {
    const server = this.app.listen(this.port);
    server.on("error", (err: Error) => this.onError);
    server.on("listening", () => this.onListening);
    console.debug(
      "Server was started on environment %s",
      Environment.getName()
    );
    console.log(`Listening on ${this.bind(server.address())}`);
  }

  /**
   * Event listener
   * @param server
   */
  private onListening = (server: http.Server): void => {
    console.log(`Listening on ${this.bind(server.address())}`);
  };

  /**
   * Error
   * @param server
   * @param error
   */
  private onError(server: http.Server, error: NodeJS.ErrnoException): void {
    if (error["syscall"] !== "listen") {
      throw error;
    }
    const addr = server.address();
    // handle specific listen errors with friendly messages

    switch (error["code"]) {
      case "EACCES":
        console.error(`${this.bind(addr)} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`${this.bind(addr)} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private bind(addr: string | any): string {
    return typeof addr === "string" ? `pipe ${addr}` : `port ${this.port}`;
  }
}

export default new Server();
