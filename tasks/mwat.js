'use strict';

module.exports = function (grunt) {

    var _ = require('lodash'),
        path = require('path');

    grunt.registerMultiTask('mwat', 'Create multiple translated sites based on templates and vocab json objects.', function () {
        
        var options = this.options({
                dictionary: ''
            }),
            files = this.files;

        var opts = {
            flatten: true,
            rename: function(dest, matchedSrcPath, options) {
                return path.join(dest, options.lng, matchedSrcPath);
            }
        };

        grunt.file.expand(options.dictionary).forEach(function(dictionaryPath) {
            files.forEach(function (f) {
                var sources=f.orig.src;
                opts.lng='it';

                grunt.file.expandMapping(sources, f.dest, opts).forEach(function(path) {
                    path.src.forEach(function (sourceFilePath) {
                        var destinationFilePath=path.dest,
                            data = grunt.file.readJSON(dictionaryPath),
                            src  = _.template(
                                grunt.file.read(sourceFilePath),
                                data
                            );

                        if(grunt.file.exists(destinationFilePath)){
                            grunt.file.delete(destinationFilePath);
                        }

                        if( grunt.file.write(destinationFilePath, src) ) {
                            grunt.log.writeln('File "' + destinationFilePath + '" created.');
                        }
                        else{
                            grunt.log.error('File "' + destinationFilePath + '" not created.');
                        }
                    });
                });
            });
        });
    });
};