'use client'

import { HeroSection } from '@/components/HeroSection'
import { FeatureBlocks } from '@/components/FeatureBlocks'
import { NodeTypesSection } from '@/components/NodeTypesSection'
import { VisualBuilderPreview } from '@/components/VisualBuilderPreview'
import { CodeGenerationPreview } from '@/components/CodeGenerationPreview'
import { CTAFooter } from '@/components/CTAFooter'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { FloatingNav } from '@/components/FloatingNav'

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
        <section id="home">
          <HeroSection />
        </section>
        <section id="features">
          <FeatureBlocks />
        </section>
        <section id="nodes">
          <NodeTypesSection />
        </section>
        <section id="codegen">
          <CodeGenerationPreview />
        </section>
        <section id="cta">
          <CTAFooter />
        </section>
    </>
  )
}