import React from 'react';

/**
 * LiquidGlassFilter
 * Procedural SVG Optical Filters implementing iOS WWDC25 & Aave Glass physics:
 * - feDisplacementMap: optical refraction bending underlying pixels
 * - feSpecularLighting: 45° physical glass specular sheen and highlight arcs
 * - feColorMatrix / Composite: Chromatic aberration (subtle prism dispersion at curved edges)
 * - feTurbulence: microscopic liquid surface texture
 */
export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <defs>
        {/* Filter 1: Deep Optical Lens Refraction with Specular Highlight */}
        <filter
          id="liquid-glass-refract"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          {/* Create organic liquid surface normal map */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="2"
            result="noise"
          />
          {/* Subtle normal displacement */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* 45° Specular light reflection on glass surface */}
          <feGaussianBlur in="noise" stdDeviation="2" result="blurNoise" />
          <feSpecularLighting
            in="blurNoise"
            surfaceScale="2"
            specularConstant="1.4"
            specularExponent="40"
            lightingColor="#ffffff"
            result="specular"
          >
            <feDistantLight azimuth="225" elevation="55" />
          </feSpecularLighting>
          {/* Composite specular sheen over refracted graphic */}
          <feComposite
            in="specular"
            in2="SourceAlpha"
            operator="in"
            result="specularClipped"
          />
          <feBlend
            in="displaced"
            in2="specularClipped"
            mode="screen"
            result="output"
          />
        </filter>

        {/* Filter 2: Pure Specular Rim & Frosted Sheen for Glass Cards */}
        <filter
          id="liquid-glass-rim"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="3"
            specularConstant="1.8"
            specularExponent="30"
            lightingColor="#d4af37"
            result="goldSpecular"
          >
            <feDistantLight azimuth="230" elevation="60" />
          </feSpecularLighting>
          <feComposite
            in="goldSpecular"
            in2="SourceAlpha"
            operator="in"
            result="clippedGold"
          />
        </filter>

        {/* Filter 3: Chromatic Aberration Dispersion (Prism Fringe along boundaries) */}
        <filter
          id="liquid-glass-chroma"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          {/* Red channel offset */}
          <feOffset in="SourceGraphic" dx="-1.5" dy="-0.8" result="red" />
          <feColorMatrix
            in="red"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="redOnly"
          />

          {/* Green channel centered */}
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="greenOnly"
          />

          {/* Blue channel offset */}
          <feOffset in="SourceGraphic" dx="1.5" dy="0.8" result="blue" />
          <feColorMatrix
            in="blue"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="blueOnly"
          />

          {/* Composite back together */}
          <feBlend in="redOnly" in2="greenOnly" mode="screen" result="rg" />
          <feBlend in="rg" in2="blueOnly" mode="screen" result="rgbCombined" />
        </filter>
      </defs>
    </svg>
  );
}
