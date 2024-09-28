// const fs = require('fs')

// module.exports = {
//     devServer: {
//         https: {
//           key: fs.readFileSync('./certs/example.com+5-key.pem'),
//           cert: fs.readFileSync('./certs/example.com+5.pem'),
//         },
//         public: 'https://localhost:8080/'
//     }
// }

// const fs = require('fs');

// module.exports = {
//   // devServer: {
//   //   open: process.platform === 'darwin',
//   //   host: '0.0.0.0',
//   //   port: 8080,
//   //   https: {
//   //     key: fs.readFileSync('.certs/key.pem'),
//   //     cert: fs.readFileSync('.certs/cert.pem'),
//   //   },
//   //   hotOnly: false,
//   // },
//   devServer: {
//     server: {
//       type: 'https',
//       options: {
//         ca: './path/to/server.pem',
//         pfx: './path/to/server.pfx',
//         key: './path/to/server.key',
//         cert: './path/to/server.crt',
//         passphrase: 'webpack-dev-server',
//         requestCert: true,
//       },
//     },
//   },
// };

module.exports = {
    devServer: {
      port: 8081, // CHANGE YOUR PORT HERE!
      https: true
    },
  }