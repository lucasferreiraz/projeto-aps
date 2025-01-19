package com.aps.sige.auth.services.OCR.processors;

import java.io.File;

public class BasicImageProcessor implements ImageProcessor {

    @Override
    public File process(File imageFile) {
        return imageFile;
    }
}

