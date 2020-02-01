import webpack from 'webpack';
import log from 'fancy-log';

import config from '../webpack.config.js';

export default function scripts() {
  return new Promise(resolve =>
    webpack(config, err => {
      if (err) {
        log.error(err.message);
      }

      resolve();
    })
  );
}
