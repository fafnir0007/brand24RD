import { Group, Avatar, Text, Accordion } from '@mantine/core';


interface AccordionLabelProps {
  title: string;
  newspaper: string;
  highlight: string
}

const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span> { parts.map((part, i) => 
      <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color:'orange' } : {} }>
          { part }
      </span>)
  } </span>;
}

const AccordionLabel = ({ title,  newspaper, highlight }: AccordionLabelProps) => {
  return (
    <Group noWrap>
      <Avatar src={'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/psvlgyaoxcjdl2bo4a7p'} radius="xl" size="lg" />
      <div>
        <Text>{newspaper}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {getHighlightedText(title, highlight)}
        </Text>
      </div>
    </Group>
  );
}

interface CustomAccordion {
    data: {
        id: any;
        newspaper:string;
        title: string;
        content: string;
    }[],
    highlight: string
}
 

const CustomAccordion = ({data, highlight}: CustomAccordion) => {
  const items = data.map((item,index) => {
    return <Accordion.Item value={item.title} key={`${index}-${item.newspaper}`}>
      <Accordion.Control>
        <AccordionLabel {...item} highlight={highlight} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{getHighlightedText(item.content, highlight)}</Text>
      </Accordion.Panel>
    </Accordion.Item>
});

  return <Accordion chevronPosition="right" variant="contained">{items}</Accordion>;
}

export default CustomAccordion

