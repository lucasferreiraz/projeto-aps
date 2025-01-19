package com.aps.sige.auth.services.OCR.decorators;

import java.io.File;

import com.aps.sige.auth.services.OCR.processors.ImageProcessor;

public class ContrastDecorator extends ImageProcessorDecorator {

    public ContrastDecorator(ImageProcessor processor) {
        super(processor);
    }

    @Override
    public File process(File imageFile) {
        File processedImage = decoratedProcessor.process(imageFile);
        return increaseContrast(processedImage);
    }

    private File increaseContrast(File imageFile) {
        return imageFile;
    }
}

