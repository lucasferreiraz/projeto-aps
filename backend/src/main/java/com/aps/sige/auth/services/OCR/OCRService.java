package com.aps.sige.auth.services.OCR;

import java.io.File;

import org.springframework.stereotype.Service;

import com.aps.sige.auth.services.OCR.decorators.ContrastDecorator;
import com.aps.sige.auth.services.OCR.decorators.GrayscaleDecorator;
import com.aps.sige.auth.services.OCR.processors.BasicImageProcessor;
import com.aps.sige.auth.services.OCR.processors.ImageProcessor;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@Service
public class OCRService {

    public String extractTextFromImage(File imageFile) {
        ImageProcessor processor = new BasicImageProcessor();
        processor = new GrayscaleDecorator(processor);
        processor = new ContrastDecorator(processor);
        
        File processedImage = processor.process(imageFile);

        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("src/main/resources/tessdata");
        tesseract.setLanguage("eng");

        try {
            return tesseract.doOCR(processedImage);
        } catch (TesseractException e) {
            e.printStackTrace();
            return "Erro ao processar a imagem";
        }
    }
}