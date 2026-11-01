import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle
} from 'docx';
import pptxgen from 'pptxgenjs';
import { UserDocument, UserPresentation } from '../types/index.js';

export class ExportService {
  /**
   * Generates a real Microsoft Word .docx buffer from a UserDocument.
   */
  public static async generateDocx(doc: UserDocument): Promise<Buffer> {
    // Strip simple HTML tags to create clean paragraphs while keeping structure
    const lines = doc.contentHtml
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/h[1-6]>/gi, '\n\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const docChildren: Paragraph[] = [
      new Paragraph({
        text: doc.title,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    ];

    for (const line of lines) {
      const isHeader = line.toUpperCase() === line && line.length < 80 && line.length > 3;
      const isBullet = line.startsWith('-') || line.startsWith('•');

      if (isHeader) {
        docChildren.push(
          new Paragraph({
            text: line,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 }
          })
        );
      } else if (isBullet) {
        docChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun(line.replace(/^[-•]\s*/, ''))],
            spacing: { after: 100 }
          })
        );
      } else {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                font: 'Times New Roman',
                size: 24 // 12pt
              })
            ],
            spacing: { after: 140, line: 360 }
          })
        );
      }
    }

    const docxDocument = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440
              }
            }
          },
          children: docChildren
        }
      ]
    });

    return await Packer.toBuffer(docxDocument);
  }

  /**
   * Generates a real Microsoft PowerPoint .pptx buffer from a UserPresentation.
   */
  public static async generatePptx(pres: UserPresentation): Promise<Buffer> {
    const pptx = new (pptxgen as any)();
    pptx.title = pres.title;
    pptx.layout = 'LAYOUT_16x9';

    const theme = pres.theme || {
      primaryColor: '2563EB',
      secondaryColor: '1E40AF',
      backgroundColor: 'FFFFFF',
      textColor: '0F172A',
      fontHeading: 'Arial',
      fontBody: 'Calibri'
    };

    // Clean colors for pptx (remove '#' if present or extract from gradient)
    const cleanHex = (val?: string) => {
      if (!val) return 'FFFFFF';
      const hexMatch = val.match(/#?([0-9a-fA-F]{6})/);
      if (hexMatch) return hexMatch[1].toUpperCase();
      return 'FFFFFF';
    };
    const primary = cleanHex(theme.primaryColor);
    const secondary = cleanHex(theme.secondaryColor);
    const bg = cleanHex(theme.backgroundColor);
    const text = cleanHex(theme.textColor);

    for (const s of pres.slides) {
      const slide = pptx.addSlide();
      
      const hasCustomBg = Boolean(s.background && s.background.trim());
      const slideBg = hasCustomBg ? cleanHex(s.background!) : bg;
      slide.bkgd = slideBg;

      const isDarkSlide = Boolean(
        hasCustomBg && 
        slideBg.toLowerCase() !== 'ffffff' && 
        slideBg.toLowerCase() !== 'f8fafc' &&
        slideBg.toLowerCase() !== 'f1f5f9'
      );
      const slideTextColor = isDarkSlide ? 'FFFFFF' : text;

      // Add Speaker / Presenter Notes if provided
      if (s.notes && s.notes.trim()) {
        try {
          slide.addNotes(s.notes.trim());
        } catch {
          // ignore if notes not supported in current environment
        }
      }

      // Header Banner / Accent Line (if not dark background)
      if (!isDarkSlide) {
        slide.addShape(pptx.ShapeType.rect, {
          x: 0,
          y: 0,
          w: '100%',
          h: 0.15,
          fill: { color: primary }
        });
      }

      if (s.layout === 'title') {
        // Title Slide Layout
        if (!hasCustomBg) {
          slide.addShape(pptx.ShapeType.rect, {
            x: 0,
            y: 0,
            w: '100%',
            h: '100%',
            fill: { color: primary }
          });
        }

        slide.addText(s.title || pres.title, {
          x: 1.0,
          y: 2.2,
          w: 11.3,
          h: 1.5,
          fontSize: 36,
          fontFace: theme.fontHeading || 'Arial',
          bold: true,
          color: 'FFFFFF',
          align: 'center'
        });

        if (s.subtitle) {
          slide.addText(s.subtitle, {
            x: 1.5,
            y: 3.8,
            w: 10.3,
            h: 1.0,
            fontSize: 20,
            fontFace: theme.fontBody || 'Calibri',
            color: 'E2E8F0',
            align: 'center'
          });
        }
      } else if (s.layout === 'quote') {
        // Quote Layout
        slide.addText('“', {
          x: 0.8,
          y: 1.2,
          w: 1.5,
          h: 1.2,
          fontSize: 64,
          fontFace: theme.fontHeading || 'Georgia',
          bold: true,
          color: primary
        });

        slide.addText(s.title, {
          x: 1.5,
          y: 1.8,
          w: 10.2,
          h: 2.6,
          fontSize: 24,
          italic: true,
          fontFace: theme.fontHeading || 'Georgia',
          color: isDarkSlide ? 'FFFFFF' : primary,
          lineSpacing: 34
        });

        if (s.subtitle) {
          slide.addText(`— ${s.subtitle}`, {
            x: 1.5,
            y: 4.6,
            w: 10.2,
            h: 0.8,
            fontSize: 16,
            bold: true,
            color: isDarkSlide ? 'CBD5E1' : '64748B'
          });
        }
      } else if (s.layout === 'timeline') {
        // Timeline / Roadmap Layout
        slide.addText(s.title, {
          x: 0.8,
          y: 0.6,
          w: 11.5,
          h: 0.8,
          fontSize: 28,
          fontFace: theme.fontHeading || 'Arial',
          bold: true,
          color: isDarkSlide ? 'FFFFFF' : primary
        });

        if (s.subtitle) {
          slide.addText(s.subtitle, {
            x: 0.8,
            y: 1.3,
            w: 11.5,
            h: 0.5,
            fontSize: 15,
            color: isDarkSlide ? 'CBD5E1' : '64748B'
          });
        }

        // Timeline Step Cards
        const steps = s.elements.filter(e => e.type === 'bullets' || e.type === 'kpis');
        const stepItems = steps.length > 0 && Array.isArray(steps[0].content) 
          ? (steps[0].content as any[]) 
          : ['Giai đoạn 1: Chuẩn bị', 'Giai đoạn 2: Phát triển', 'Giai đoạn 3: Ra mắt', 'Giai đoạn 4: Mở rộng'];

        const stepWidth = 2.6;
        const stepGap = 0.3;
        stepItems.slice(0, 4).forEach((item, idx) => {
          const posX = 0.8 + idx * (stepWidth + stepGap);
          const stepTitle = typeof item === 'string' ? item : item.label || item.value || `Mốc ${idx + 1}`;
          const stepDesc = typeof item === 'string' ? 'Kế hoạch triển khai trọng tâm' : item.desc || item.value || '';

          slide.addShape(pptx.ShapeType.roundRect, {
            x: posX,
            y: 2.6,
            w: stepWidth,
            h: 3.2,
            fill: { color: isDarkSlide ? '1E293B' : 'F8FAFC' },
            line: { color: isDarkSlide ? '334155' : 'CBD5E1', width: 1 }
          });

          slide.addText(`Giai đoạn 0${idx + 1}`, {
            x: posX + 0.1,
            y: 2.8,
            w: stepWidth - 0.2,
            h: 0.5,
            fontSize: 12,
            bold: true,
            color: primary,
            align: 'center'
          });

          slide.addText(stepTitle, {
            x: posX + 0.1,
            y: 3.4,
            w: stepWidth - 0.2,
            h: 1.0,
            fontSize: 14,
            bold: true,
            color: isDarkSlide ? 'FFFFFF' : text,
            align: 'center'
          });

          if (stepDesc) {
            slide.addText(stepDesc, {
              x: posX + 0.1,
              y: 4.5,
              w: stepWidth - 0.2,
              h: 1.0,
              fontSize: 11,
              color: isDarkSlide ? '94A3B8' : '64748B',
              align: 'center'
            });
          }
        });
      } else if (s.layout === 'stats-kpi') {
        // Stats / KPI Layout
        slide.addText(s.title, {
          x: 0.8,
          y: 0.6,
          w: 11.5,
          h: 0.8,
          fontSize: 28,
          fontFace: theme.fontHeading || 'Arial',
          bold: true,
          color: primary
        });

        if (s.subtitle) {
          slide.addText(s.subtitle, {
            x: 0.8,
            y: 1.4,
            w: 11.5,
            h: 0.5,
            fontSize: 16,
            color: '64748B'
          });
        }

        // Render KPI cards
        const kpiElements = s.elements.filter(e => e.type === 'kpis');
        if (kpiElements.length > 0 && Array.isArray(kpiElements[0].content)) {
          const items = kpiElements[0].content as Array<{ label: string; value: string; desc?: string }>;
          const cardWidth = 2.6;
          const cardGap = 0.3;
          items.slice(0, 4).forEach((item, idx) => {
            const posX = 0.8 + idx * (cardWidth + cardGap);
            slide.addShape(pptx.ShapeType.roundRect, {
              x: posX,
              y: 2.5,
              w: cardWidth,
              h: 3.2,
              fill: { color: 'F8FAFC' },
              line: { color: 'CBD5E1', width: 1 }
            });

            slide.addText(item.value, {
              x: posX + 0.1,
              y: 2.8,
              w: cardWidth - 0.2,
              h: 0.9,
              fontSize: 28,
              bold: true,
              color: primary,
              align: 'center'
            });

            slide.addText(item.label, {
              x: posX + 0.1,
              y: 3.8,
              w: cardWidth - 0.2,
              h: 0.8,
              fontSize: 14,
              bold: true,
              color: text,
              align: 'center'
            });

            if (item.desc) {
              slide.addText(item.desc, {
                x: posX + 0.1,
                y: 4.6,
                w: cardWidth - 0.2,
                h: 0.8,
                fontSize: 12,
                color: '64748B',
                align: 'center'
              });
            }
          });
        }
      } else {
        // Standard Content / Two Columns / Bullets Layout
        slide.addText(s.title, {
          x: 0.8,
          y: 0.6,
          w: 11.5,
          h: 0.8,
          fontSize: 28,
          fontFace: theme.fontHeading || 'Arial',
          bold: true,
          color: primary
        });

        if (s.subtitle) {
          slide.addText(s.subtitle, {
            x: 0.8,
            y: 1.3,
            w: 11.5,
            h: 0.5,
            fontSize: 15,
            color: '64748B'
          });
        }

        let posY = 2.0;
        for (const el of s.elements) {
          if (el.type === 'bullets' && Array.isArray(el.content)) {
            const bulletItems = el.content as string[];
            slide.addText(
              bulletItems.map(b => ({
                text: b,
                options: { bullet: true, fontSize: 16, color: text, breakLine: true }
              })),
              {
                x: 0.8,
                y: posY,
                w: 11.5,
                h: 4.2,
                lineSpacing: 28
              }
            );
            posY += 4.2;
          } else if (el.type === 'paragraph' && typeof el.content === 'string') {
            slide.addText(el.content, {
              x: 0.8,
              y: posY,
              w: 11.5,
              h: 1.2,
              fontSize: 16,
              color: text
            });
            posY += 1.4;
          }
        }
      }

      // Slide Footer
      slide.addText(`OmniDoc Presentation Suite • Trang ${s.slideNumber}`, {
        x: 0.8,
        y: 7.0,
        w: 11.5,
        h: 0.4,
        fontSize: 10,
        color: '94A3B8'
      });
    }

    const buffer = await pptx.write({ outputType: 'nodebuffer' });
    return buffer as Buffer;
  }
}
