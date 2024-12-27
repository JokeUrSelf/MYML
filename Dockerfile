FROM denoland/deno

WORKDIR /app

COPY . .

CMD ["deno", "run", "start", "--allow-net", "--allow-read"]
