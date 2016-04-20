module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      myTarget: {
        files: {
          'scripts/myApp.min.js' : 
          [
            'src/books.js',
            'src/controller.js',
            'src/service.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', [ 'uglify' ]);
};