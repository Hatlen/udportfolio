/*
 After you have changed any settings for the responsive_images task,
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 100,
            height: 62,
            quality: 70,
            name: '@1x',
            aspectRatio: false
          }, {
            width: 200,
            height: 124,
            quality: 70,
            name: '@2x',
            aspectRatio: false
          }]
        },
        files: [{
          expand: true,
          src: ['pizzeria.jpg'],
          cwd: 'img_src/',
          dest: 'img/'
        }]
      }
    },
    // not in use yet
    responsive_views_images:{
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 100,
            quality: 30,
            name: '@1x'
          }, {
            width: 200,
            quality: 30,
            name: '@2x'
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'views/images_src/',
          dest: 'views/images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img']
        },
      },
    },
    // copy images that shouldn't be cropped
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['img_src/*.{jpg,png}'],
          dest: 'img/',
          flatten: true
        }]
      },
    },
    inline: {
      dist: {
        options: {
          cssmin: true,
          uglify: true
        },
        src: 'index-src.html',
        dest: 'index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-inline');
  grunt.registerTask('make-images', ['clean', 'mkdir', 'copy', 'responsive_images']);
  grunt.registerTask('inline-stylesheet', ['inline']);

  grunt.registerTask('default', ['make-images', 'inline-stylesheet']);
};
