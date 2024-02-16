import React, { useState, useEffect } from 'react';
import { Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, Text, Box } from '@chakra-ui/react';

const Badges=()=> {
    const [badges, setBadges] = useState([]);
    const [selectedBadge, setSelectedBadge] = useState(null);

    const fetchBadges = async () => {
        try {
            const response = await fetch('https://staging.questprotocol.xyz/api/entities/e-0000000000/users/u-a2399489-9cd0-4c94-ad12-568379202b08/badges', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    apikey: 'k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be',
                    userid: 'u-a2399489-9cd0-4c94-ad12-568379202b08',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc'
                }
            });
            const data = await response.json();
            setBadges(data.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchBadges();
   }, []);

    const handleBadgeClick = (badge) => {
        setSelectedBadge(badge);
    };

    const handleCloseModal = () => {
        setSelectedBadge(null);
    };

    return (
        <>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "30px",
                justifyContent: "center",
                background: "white",
                paddingTop: "22px"
            }}>
                {badges.map((badge, index) => (
                    <div key={index} style={{ display: "flex", flexWrap: "wrap", gap: "500px", borderRadius: "50%" }}>
                        <Image
                            src={badge.imageUrl}
                            alt={badge.name}
                            style={{
                                borderRadius: "50%",
                                boxSize: '150px',
                                border: "1px solid black",
                                width: "70px",
                                height: "70px",
                            }}
                            onClick={() => handleBadgeClick(badge)}
                        />
                    </div>
                ))}
            </div>
            <Modal isOpen={selectedBadge !== null} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedBadge?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" flexDirection={"column"} alignItems={"center"} padding="92px">
                            <Image src={selectedBadge?.imageUrl} alt={selectedBadge?.name} width="100px" />
                            <Text fontSize="xl" mt={4} textAlign="center">Badge Unlocked 🌟</Text>
                            <Text fontSize="xl" width="450px" textAlign="center">🎉 Level Up! Earned a shiny new badge! 🎖️🌟</Text>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {selectedBadge && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(6px)',
                    zIndex: 1000
                }} onClick={handleCloseModal} />
            )}
        </>
    );
}

export default Badges;
