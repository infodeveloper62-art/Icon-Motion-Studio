import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface SocialIconItem {
  id: string;
  name: string;
  brandColor: string;
  gradient?: string;
  textColorOnHover?: string;
  url: string;
  svgPath: string;
  viewBox?: string;
}

export type AnimationType = 'none' | 'fade' | 'slide' | 'scale' | 'slide-left' | 'slide-right' | 'blur-in' | 'rise';
export type HoverEffectType = 'none' | 'lift' | 'grow' | 'glow' | 'shine' | 'border';
export type IconStyleType = 'color-pop' | 'always-brand' | 'outline' | 'glass-pill';
export type ShapeType = 'circle' | 'squircle' | 'minimal';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Active settings state
  activeTab = signal<'animation' | 'style' | 'layout' | 'recommendation'>('recommendation');
  selectedAnimation = signal<AnimationType>('scale');
  selectedHoverEffect = signal<HoverEffectType>('grow');
  iconStyle = signal<IconStyleType>('color-pop');
  shape = signal<ShapeType>('circle');
  iconSize = signal<number>(48); // px
  gapSize = signal<number>(16); // px
  previewBg = signal<'light' | 'dark' | 'hero' | 'slate'>('light');
  
  // Animation replay key
  animationKey = signal<number>(0);
  
  // Copied code feedback
  copiedCode = signal<boolean>(false);
  
  // Language tab for explanations: Roman Urdu vs English
  lang = signal<'roman-urdu' | 'english'>('roman-urdu');

  // Social Icons list matching the screenshot
  icons = signal<SocialIconItem[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      brandColor: '#1877F2',
      url: 'https://facebook.com',
      svgPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      viewBox: '0 0 24 24',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      brandColor: '#E1306C',
      gradient: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      url: 'https://instagram.com',
      svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      viewBox: '0 0 24 24',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      brandColor: '#25D366',
      url: 'https://whatsapp.com',
      svgPath: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
      viewBox: '0 0 24 24',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      brandColor: '#FF0000',
      url: 'https://youtube.com',
      svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
      viewBox: '0 0 24 24',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      brandColor: '#00F2FE',
      gradient: 'linear-gradient(135deg, #000000 0%, #00F2FE 50%, #4facfe 100%)',
      url: 'https://tiktok.com',
      svgPath: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
      viewBox: '0 0 24 24',
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      brandColor: '#FFFC00',
      textColorOnHover: '#000000',
      url: 'https://snapchat.com',
      svgPath: 'M12.016 0C5.394 0 .044 5.378.044 12.032c0 2.827.973 5.424 2.607 7.48.064.08.106.177.106.282 0 .15-.084.288-.21.366-1.12.686-1.895 1.874-1.895 3.25 0 .235.034.464.097.683.056.195.228.337.43.337h21.657c.202 0 .374-.142.43-.337.063-.219.097-.448.097-.683 0-1.376-.775-2.564-1.895-3.25-.126-.078-.21-.216-.21-.366 0-.105.042-.202.106-.282 1.634-2.056 2.607-4.653 2.607-7.48C23.988 5.378 18.638 0 12.016 0zm-1.83 5.22c.594-.282 1.258-.437 1.956-.437s1.362.155 1.956.437c1.376.654 2.27 2.032 2.27 3.593 0 .742-.21 1.436-.575 2.029-.187.304-.424.576-.703.805-.098.08-.146.21-.122.336.064.33.208.797.464 1.157.198.278.474.492.836.574.225.051.376.257.348.487-.075.617-.432 1.144-.959 1.442-.284.16-.62.247-.978.247-.19 0-.377-.024-.555-.072-.258-.07-.532.046-.66.28-.466.852-1.33 1.428-2.327 1.428s-1.861-.576-2.327-1.428c-.128-.234-.402-.35-.66-.28-.178.048-.365.072-.555.072-.358 0-.694-.087-.978-.247-.527-.298-.884-.825-.959-1.442-.028-.23.123-.436.348-.487.362-.082.638-.296.836-.574.256-.36.4-.827.464-1.157.024-.126-.024-.256-.122-.336-.279-.229-.516-.501-.703-.805-.365-.593-.575-1.287-.575-2.029 0-1.561.894-2.939 2.27-3.593z',
      viewBox: '0 0 24 24',
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      brandColor: '#E60023',
      url: 'https://pinterest.com',
      svgPath: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z',
      viewBox: '0 0 24 24',
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      brandColor: '#000000',
      url: 'https://x.com',
      svgPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      viewBox: '0 0 24 24',
    }
  ]);

  // Specific preset recommendations
  setExactScreenshotPreset() {
    this.selectedAnimation.set('scale');
    this.selectedHoverEffect.set('grow');
    this.iconStyle.set('color-pop');
    this.shape.set('circle');
    this.replayAnimation();
  }

  setAlternativePreset(anim: AnimationType, hover: HoverEffectType) {
    this.selectedAnimation.set(anim);
    this.selectedHoverEffect.set(hover);
    this.replayAnimation();
  }

  replayAnimation() {
    this.animationKey.update(v => v + 1);
  }

  // Generate CSS code for the user
  generatedCode = computed(() => {
    const anim = this.selectedAnimation();
    const hover = this.selectedHoverEffect();
    const style = this.iconStyle();

    return `/* --- Social Icons Styling (${style.toUpperCase()}) --- */
.social-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-icon-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563; /* Default monochrome */
  background: transparent;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  ${anim === 'scale' ? 'animation: scaleIn 0.5s ease both;' : ''}
  ${anim === 'fade' ? 'animation: fadeIn 0.5s ease both;' : ''}
  ${anim === 'rise' ? 'animation: riseUp 0.6s ease both;' : ''}
}

/* Hover Effect: ${hover.toUpperCase()} + Brand Color Pop */
.social-icon-item:hover {
  color: #ffffff;
  ${hover === 'grow' ? 'transform: scale(1.15);' : ''}
  ${hover === 'lift' ? 'transform: translateY(-6px); box-shadow: 0 10px 20px rgba(0,0,0,0.15);' : ''}
  ${hover === 'glow' ? 'box-shadow: 0 0 18px currentColor;' : ''}
}

/* Instagram Gradient Background on Hover */
.social-icon-item.instagram:hover {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
}

/* TikTok Vibrant Fill on Hover */
.social-icon-item.tiktok:hover {
  background: #00F2FE; /* or #000000 with cyan shadow */
  box-shadow: 0 4px 15px rgba(0, 242, 254, 0.4);
}

/* Facebook Meta Blue */
.social-icon-item.facebook:hover {
  background: #1877F2;
}

/* WhatsApp Green */
.social-icon-item.whatsapp:hover {
  background: #25D366;
}

/* YouTube Red */
.social-icon-item.youtube:hover {
  background: #FF0000;
}`;
  });

  copyCode() {
    navigator.clipboard.writeText(this.generatedCode());
    this.copiedCode.set(true);
    setTimeout(() => {
      this.copiedCode.set(false);
    }, 2500);
  }
}
