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
          newFilesOnly: false,
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
        files: {
          'img/pizzeria.jpg': 'img_src/pizzeria.jpg'
        }
      },
      /* this task doesn't override the already copied files, and is overriden
      * by the copy task if you put it before this task */
      dev2: {
        options: {
          newFilesOnly: false,
          engine: 'im',
          rename: false,
          quality: 70
        },
        files: {
          'img/profilepic.jpg': 'img_src/profilepic.jpg'
        }
      },
      dev3: {
        options: {
          newFilesOnly: false,
          engine: 'im',
          quality: 50,
          rename: false
        },
        files: {
          'img/cam_be_like.jpg': 'img_src/cam_be_like.jpg',
          'views/images/pizza.png': 'views/images_src/pizza.png'
        }
      },
      dev4: {
        options: {
          newFilesOnly: false,
          engine: 'im',
          quality: 50,
          rename: false,
          sizes: [{
            width: 720
          }]
        },
        files: {
          'views/images/pizzeria.jpg': 'views/images_src/pizzeria.jpg'
        }
      },
      dev4: {
        options: {
          newFilesOnly: false,
          engine: 'im',
          quality: 70,
          rename: false,
          sizes: [{
            width: 602
          }]
        },
        files: {
          'img/mobilewebdev.jpg': 'img_src/mobilewebdev.jpg'
        }
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
        files: {
          'index.html': 'index-src.html',
          'views/pizza.html': 'views/pizza-src.html'
        }
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
  grunt.registerTask('make-images', ['clean', 'mkdir', 'copy', 'responsive_images']);
  grunt.registerTask('inline-stylesheet', ['inline']);

  grunt.registerTask('default', ['make-images', 'cssUrlEmbed', 'inline-stylesheet']);
};
