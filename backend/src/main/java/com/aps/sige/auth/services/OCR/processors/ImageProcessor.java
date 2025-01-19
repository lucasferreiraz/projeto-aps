package com.aps.sige.auth.services.OCR.processors;

import java.io.File;

public interface ImageProcessor {
    File process(File imageFile);
}
