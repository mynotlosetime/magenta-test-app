import * as intel from "intel";

intel.config({
  formatters: {
    details: {
      format: "[%(date)s] %(name)s.%(levelname)s: %(message)s",
      strip: true
    }
  },
  handlers: {
    userInfoHandler: {
      class: intel.handlers.File,
      file: "./logs/user.info.log",
      formatter: "details"
    },
    errorsHandler: {
      class: intel.handlers.File,
      file: "./logs/errors.log",
      formatter: "details"
    }
  },
  loggers: {
    userInfo: {
      handlers: ["userInfoHandler"],
      handleExceptions: true,
      exitOnError: false,
      propagate: false
    },
    errors: {
      handlers: ["errorsHandler"],
      handleExceptions: true,
      exitOnError: false,
      propagate: false
    }
  }
});

export const loggerProviders = [
  {
    provide: "UsersLogger",
    useFactory: async () => {
      return intel.getLogger("userInfo");
    }
  },
  {
    provide: "ErrorsLogger",
    useFactory: async () => {
      return intel.getLogger("errors");
    }
  }
];
