# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2019-02-05

### Added

- Fix published version and scripting.

## [1.1.0] - 2019-02-05

### Added

- `startMessenger()` was added to prevent side effects when using `toggleMessenger()`. It's now required to start the messenger before sending any message to the bot.
- Improve testing and add tests to withLightbotMessenger React HOC.

### Removed

- Allowed senders are now only `"bot"` and `"human"`.
  `"supported"` was removed due to not being used.

## [1.0.0] - 2019-01-24

### Added

First release
