/**
 * @file LanguageBar.tsx
 * @description A language bar component to display the breakdown of languages used in a github repository.
 */
import * as React from "react";
import useLanguageBreakdown from "../../hooks/useLanguageBreakdown";
import { Language, LanguageBreakdown } from '../../types/Language';
import styled from "styled-components";
import Repository from "../../types/Repository";


const LanguageBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.baseSize};
  background: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.textPrimary};
`;

const LanguageBar = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  border-bottom-left-radius: 2px;
  border-bottom-left-radius: 2px;
  cursor: pointer;
`;

const LanguageBarSegment = styled.div`
  display: block;
`;

const LanguageBarDetailsContainer = styled.ol`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: space-evenly;
  list-style-type: none;
`;

const LanguageBarDetails = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: 600;
`
const LanguageBarDetailsColoredCircle = styled.span`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  display: inline-block;
  margin-right: 5px;
`;

const LanguageBarDetailsLanguageName = styled.span`
  margin-right: 5px;
`;

const LanguageDetailsLanguagePercent = styled.span`
  color: ${props => props.theme.colors.textSecondary};

`;
export default ({ languages, totalSize }: LanguageBreakdown) => {

  const [detailsVisible, setDetailsVisible] = React.useState(false);

  const sortedAndFilteredLanguages = languages
    ?.filter(({ percent }: Language) => percent > 0.1)
    .sort((langA: Language, langB: Language) => langA.size > langB.size ? -1 : 1); 

  return (
    <LanguageBarContainer className={`sc-language-bar`}>
      <LanguageBar className="sc-language-bar__bar" onClick={() => setDetailsVisible(!detailsVisible)}>
        {sortedAndFilteredLanguages ?.map((lang: Language) => {
          return (
            <LanguageBarSegment
              key={`language-bar-portion-${lang.id}`}
              className={`sc-language-bar__portion sc-language-bar--language--${lang.name.toLowerCase()}`}
              style={{ width: `${lang.percent}%`, background: lang.color || '#ccc' }}>
            </LanguageBarSegment>
          );
        })}
      </LanguageBar>

      <LanguageBarDetailsContainer className={`sc-language-bar__details--${detailsVisible ? 'open' : 'closed'}`}>
        {sortedAndFilteredLanguages ?.filter(({ percent }: Language) => percent > 0.1).map((lang: Language) => {
          return (
            <LanguageBarDetails key={`language-bar-details-${lang.id}`}>

              <LanguageBarDetailsColoredCircle style={{ background: lang.color || '#ccc' }} />
              <LanguageBarDetailsLanguageName>
                {lang.name}
              </LanguageBarDetailsLanguageName>
              <LanguageDetailsLanguagePercent>{lang.percent.toFixed(1)}%</LanguageDetailsLanguagePercent>
            </LanguageBarDetails>
          )
        })}
      </LanguageBarDetailsContainer>
    </LanguageBarContainer>
  )
};
