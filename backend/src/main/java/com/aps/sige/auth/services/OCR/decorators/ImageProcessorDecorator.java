package com.aps.sige.auth.services.OCR.decorators;

import java.io.File;

import com.aps.sige.auth.services.OCR.processors.ImageProcessor;

public abstract class ImageProcessorDecorator implements ImageProcessor {
    protected ImageProcessor decoratedProcessor;

    public ImageProcessorDecorator(ImageProcessor processor) {
        this.decoratedProcessor = processor;
    }

    @Override
    public File process(File imageFile) {
        return decoratedProcessor.process(imageFile);
    }
}

