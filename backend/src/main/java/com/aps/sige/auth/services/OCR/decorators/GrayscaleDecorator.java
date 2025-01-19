package com.aps.sige.auth.services.OCR.decorators;

import java.io.File;

import com.aps.sige.auth.services.OCR.processors.ImageProcessor;

public class GrayscaleDecorator extends ImageProcessorDecorator {

    public GrayscaleDecorator(ImageProcessor processor) {
        super(processor);
    }

    @Override
    public File process(File imageFile) {
        File processedImage = decoratedProcessor.process(imageFile);
        return convertToGrayscale(processedImage);
    }

    private File convertToGrayscale(File imageFile) {
        return imageFile;
    }
}

