import React from 'react';
import useSessionStorage from 'react-use/lib/useSessionStorage';
import { Dialog } from '@reach/dialog';
import { Box, Flex, Image as RebassImage } from 'rebass';
import VisuallyHidden from '@reach/visually-hidden';
import RebassButton from './RebassButton';
import RebassText from './RebassText';
import headerLogo from './assets/header-icon.svg';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

const popupId = 'has_seen_welcome_popup';

function WelcomePopup() {
  const [hasSeenPopup, setHasSeenPopup] = useSessionStorage(popupId, false);
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "welcome-image.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div>
      <Dialog
        onDismiss={() => setHasSeenPopup(true)}
        isOpen={!hasSeenPopup}
        style={{ position: 'relative' }}
      >
        <Box
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            outline: '1px solid #626363',
            opacity: 0.5,
          }}
          m={3}
        >
          <RebassButton
            bg="transparent"
            p={1}
            onClick={() => setHasSeenPopup(true)}
          >
            <VisuallyHidden>Cerrar</VisuallyHidden>
            <div aria-hidden style={{ width: 12, height: 12 }}>
              <svg
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#626363"
                fill="grey"
                style={{ width: 12, height: 12, display: 'block' }}
              >
                <path d="M0 0 L12 12" stroke-width="1" />
                <path d="M12 0 L0 12" stroke-width="1" />
              </svg>
            </div>
          </RebassButton>
        </Box>
        <Box mt={3} mx={4}>
          <RebassImage
            as={GatsbyImage}
            fluid={fluid}
            alt="Señora artesana"
            aria-hidden
            borderRadius={0}
          />
          <RebassText pt={1} fontStyle="italic" lineHeight={1.3}>
            Recuerda que, al ser artesanal, cada producto puede variar en
            diseño, forma y/o colores. Cada pieza es única.
          </RebassText>
          <RebassText fontWeight="bold" fontStyle="italic" lineHeight={1.3}>
            ¡Gracias por apoyar a artesanos mexicanos!
          </RebassText>
          <Flex justifyContent="flex-end" mt={3}>
            <RebassImage
              as={'img'}
              width={0.3}
              src={headerLogo}
              alt="New Marías Curadería artesanal"
              aria-hidden
              borderRadius={0}
            />
          </Flex>
        </Box>
      </Dialog>
    </div>
  );
}

export default WelcomePopup;
