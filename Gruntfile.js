module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      // define the files to lint
      files: ['./lib/**/*.js'],
  	  // configure JSHint (documented at http://www.jshint.com/docs/)
  	  options: {
  	      // more options here if you want to override JSHint defaults
         globals: {
           console: true,
           module: true
         }
       }
     },

     nodeunit: {
       unit: ['test/*.js']
     },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      all: {
       files: [ '**/*.js' ],
       tasks: [ 'test' ]
     }
   }   
 });

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['concurrent:server'])
  grunt.registerTask('test', ['nodeunit:unit'])
};