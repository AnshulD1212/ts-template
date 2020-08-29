import * as Sentry from "@sentry/node";

function getSentryConfig(environment: string | "development" | "production" | "testing") {
  return {
    dsn: process.env.DSN,
    opts: {
      environment
    }
  };
}

const sentryConfig = getSentryConfig(process.env.NODE_ENV ?? "development");

Sentry.init({
  dsn: sentryConfig.dsn,
  release: `platform_configuration`,
  environment: process.env.NODE_ENV || "development",
  attachStacktrace: true
});

export {
  Sentry
}
