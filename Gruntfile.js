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
      },
      /* this task doesn't override the already copied files, and is overriden
      * by the copy task if you put it before this task */
      dev2: {
        options: {
          engine: 'im',
          sizes: [{
            width: 70,
            quality: 75,
            rename: false
          }]
        },
        files: [{
            expand: true,
            src: ['profilepic.jpg'],
            cwd: 'img_src/',
            dest: 'img/'
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
    },
    cssUrlEmbed: {
      encodeDirectly: {
        options: {
          inclusive: true
        },
        files: {
          'css/open-sans.css': ['css/open-sans-src.css']
        },
        expand: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.registerTask('make-images', ['clean', 'mkdir', 'responsive_images', 'copy']);
  grunt.registerTask('inline-stylesheet', ['inline']);

  grunt.registerTask('default', ['make-images', 'cssUrlEmbed', 'inline-stylesheet']);
};
