import React from 'react';
import PropTypes from 'prop-types';

import Section from './styled/Section';
import Box from './styled/Box';

import Levels from './styled/Levels';
import Stones from './styled/Stones';
import SourceMarks from './styled/SourceMarks';
import Crafting from './styled/Crafting';
import AbilityGroup from './styled/AbilityGroup';
import Racials from './styled/Racials';
import Pools from './styled/Pools';

import Field from '../util/styled/Field';

const CharacterSheet = (props) => {
  const rest = Object.assign({}, props);
  delete rest.character;
  delete rest.rules;
  delete rest.viewRule;
  delete rest.editCharacter;

  const {
    name,
    build,
    lives,
    race,
    sourceMarks
  } = props.character;
  const {
    interval,
    level,
    canLearn,
    races,
    cultures,
    racials,
    languages,
    constants,
    crafts,
    domains,
    advancedArts,
    pools,
    sourceMark,
    recoveries,
    body,
    buffs,
    inscriptions,
    armor,
    damage,
    healing,
    freeSkills
  } = props.rules;
  const domainNames = domains.map(rule => rule.group)
    .filter((rule, index, self) => self.indexOf(rule) == index)
    .sort((a, b) => {
      if(a == 'Burn')
        return 1;
      if(b == 'Burn')
        return -1;
      return a > b ? 1 : -1;
    });
  return (
    <div {...rest}>
      <Section>
        <Box color label='Character Name'>
          <Field
            name='name'
            value={name}
            onChange={props.editCharacter}
          />
        </Box>
        <Box label='Build Total' factor={1/3}>
          <Field
            name='total build'
            value={build.total}
          />
        </Box>
        <Box label='Build Spent' factor={1/3}>
          <Field
            name='spent build'
            value={build.spent}
          />
        </Box>
        <Box label='Level' factor={1/3}>
          <Field
            name='level'
            value={level}
          />
        </Box>
        <Box label='Body' factor={1/3}>
          <Field
            name='body'
            value={(body.base + body.extra + body.perLevel * level) * (body.double ? 2 : 1)}
          />
        </Box>
        <Box label='Buffs' factor={1/3}>
          <Field
            name='buffs'
            value={buffs.base + buffs.extra}
          />
        </Box>
        <Box label='Tattoos' factor={1/3}>
          <Field
            name='inscriptions'
            value={inscriptions.base + inscriptions.extra}
          />
        </Box>
        <Box color label='Ressurection Bag'>
          <Stones
            stones={lives}
            type='life'
            stoneClick={props.editCharacter}
          />
        </Box>
        <Box label='Recoveries'>
          <Stones
            stones={recoveries.base + recoveries.extra}
          />
        </Box>
        <Box color={sourceMark.limit > 0}
          label='Source Mark Elements'
        >
          <SourceMarks
            limit={sourceMark.limit}
            mastery={sourceMark.mastery}
            granted={sourceMark.granted}
            known={sourceMarks}
            editCharacter={props.editCharacter}
          />
        </Box>
      </Section>
      <Section>
        <Box color label='Race' factor={0.5}>
          <Field
            name='race'
            value={race.name}
            type='select'
            options={races.map(r => {
              return { value: r.name, label: r.name };
            })}
            onChange={props.editCharacter}
          />
        </Box>
        <Box color label='Culture' factor={0.5}>
          <Field
            name='culture'
            value={race.culture}
            type='select'
            options={cultures.filter(c => !race.name || c.group == race.name)
              .map(c => {
                return { value: c.name, label: c.name };
              })}
            onChange={props.editCharacter}
          />
        </Box>
        <Box color={!!race.name} label='Racial'>
          <Racials
            race={race.name}
            culture={race.culture}
            prodigy={race.prodigy}
            racials={racials}
            viewDescription={props.viewRule}
            editCharacter={props.editCharacter}
          />
        </Box>
      </Section>
      <Section>
        <Box color={!!race.name} label='Languages'>
          <AbilityGroup
            abilities={languages.filter(l => {
              return l.group == race.name || l.group == '';
            }).sort((a, b) => {
              if(a.build == b.build)
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
              return a.build - b.build;
            })}
            viewDescription={props.viewRule}
            editCharacter={props.editCharacter}
          />
        </Box>
        <Box color={canLearn.T1} label='Free Domains'>
          <Levels
            level={level}
            domains={domains}
            known={freeSkills}
            T1={canLearn.T1}
            T2={canLearn.T2}
            T3={canLearn.T3}
            editCharacter={props.editCharacter}
          />
        </Box>
      </Section>
      <Box color label='Craft Skills'>
        <AbilityGroup
          abilities={crafts}
          viewDescription={props.viewRule}
          editCharacter={props.editCharacter}
        />
      </Box>
      <Box color label='Constant Skills'>
        <AbilityGroup
          abilities={constants}
          viewDescription={props.viewRule}
          editCharacter={props.editCharacter}
        />
      </Box>
      <Box color label='Combat Pools'>
        <Pools
          abilities={pools}
          viewDescription={props.viewRule}
          editCharacter={props.editCharacter}
        />
      </Box>
      {domainNames.map(domain => {
        return (
          <Box color={canLearn.T1} label={domain} key={domain}>
            <AbilityGroup
              abilities={domains.filter(rule => rule.group == domain)}
              viewDescription={props.viewRule}
              editCharacter={props.editCharacter}
            />
          </Box>
        );
      })}
      <Box color={canLearn.AA} label='Advanced Arts'>
        <AbilityGroup
          abilities={advancedArts}
          viewDescription={props.viewRule}
          editCharacter={props.editCharacter}
        />
      </Box>
    </div>
  );
}

CharacterSheet.defaultProps = {
  character: {},
  rules: {}
};

CharacterSheet.propTypes = {
  character: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  viewRule: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default CharacterSheet;
