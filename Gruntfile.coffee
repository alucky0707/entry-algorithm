module.exports = (grunt) ->
  grunt.initConfig
    copy:
      main:
        src: ['lib/**', 'resource/**', '*.html']
        dest: 'gh-pages/'
    jade:
      compile:
        files:
          'index.html': ['jade/index.jade']
    bower:
      install:
        options:
          targetDir: 'lib'
          layout: 'byComponent'
          install: true
          cleanTargetDir: true
    watch:
      files: ['jade/*.jade']
      tasks: ['jade']

  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-bower-task'
