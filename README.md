# Univer Sheet With Server Start-Kit

This template can help you get started with using the Univer Server, and you can use the code inside to create useful applications.

- [x] collaboration plugin with Univer Server
- [x] exchange plugin with Univer Server
- [x] print plugin with Univer Server

## More about Univer Server

You can find more information about Univer Server [here](https://docs.univer.ai/guides/sheets).

## How to use

First, you need to deploy Univer Server with Docker, you can follow the instructions [here](https://docs.univer.ai/guides/sheets/pro-features/server/overview).

Then, you need to copy the `.env.example` file to `.env` and set the `UNIVER_ENDPOINT` variable to your Univer Server URL.

Now you can use the following command to start the application:

```bash
pnpm install
pnpm dev
```

Open two different browsers and visit `http://localhost:5173/`, you can test the collaboration feature.

## Online Demo

You also can see the online demo [here](https://univer.ai/features).
