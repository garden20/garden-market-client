var url = require('url');

module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['garden-market-client.js']
    },
    mochaTest: {
        quick: ['test/test.js']
    },
    min: {
      dist: {
        src: ['./garden-market-client.js'],
        dest: './garden-market-client.min.js'
      }
    },
    concat: {
        dist: {
          src: ['./garden-market-client.js'],
          dest: 'test/qunit/assets/garden-market-client.js'
        }
    },
    qunit: {
      all: ['http://localhost:8000/test/qunit/index.html']
    },
    server: {
      port: 8000,
      base: '.'
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');


  // Default task.
  grunt.registerTask('default', 'lint mochaTest concat server qunit min');

};