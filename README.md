# Overview
The Cross Stitch Tool is a web application built in React/Typescript and Python. The Cross Stitch Tool serves to ease the process of translating pixel art images to the cross stitch/embroidery medium (https://en.wikipedia.org/wiki/Cross-stitch). To do so, the Cross Stitch Tool leverages a few different features.

# Features

**Pixel Size Identification/Image Compression**
To make operations on the image easier, the tool can identify and rank the most likely pixel sizes (with result likeliness proportional to how "noisy" an image is) with a custom corner-detection algorithm. The most likely pixel size is chosen by default, but users can test the other suggested sizes until the correct one is found.

By compressing the image, the tool is able to "clean" the noise out of poorly compressed pixel art images.

**Color Mapping**
The tool can then identify the color palette of the image, and rank the real-life DMC thread colors in terms of "closeness" to the images. This allows you to easily identify and purchase the needed colors, instead of just guessing based on sight.

**Color Swapping**
To test how the image would look in real life, the user can swap the pixel art's colors with the DMC equivalent in real time!

# Whats next?
This project is still IN PROGRESS, and will be updated overtime. In addition to fine-tuning the existing features to work even better with bad (or exceptionally "noisy" images) images and reducing user input, I plan to add features to aid in the actual creation of the cross stitch.

I will be adding any features that I find useful for this, and eventually upload it for use online!
