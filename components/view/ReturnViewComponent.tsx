import { SectionType } from '@/types'
import React from 'react'
import HeroView from './HeroView'
import TextWithImageView from './TextWithImageView'
import OnlyTextView from './OnlyTextView'

function ReturnViewComponent({
  pageType,
  section,
  dev,
} : {
  pageType: string,
  section: SectionType,
  dev?: boolean,
}) {
  
    if(pageType === "Hero"){
      return <HeroView dev={dev} section={section} />
    }
    else if (pageType === "TextWithImage"){
      return <TextWithImageView dev={dev} section={section} />
    } else if (pageType === "OnlyText") {
      return <OnlyTextView dev={dev} section={section} />
    }

}

export default ReturnViewComponent