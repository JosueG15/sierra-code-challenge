export interface RedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<"OK">;
  del(key: string): Promise<number>;
  quit(): Promise<"OK">;
}
