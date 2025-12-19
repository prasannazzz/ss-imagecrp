import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Color palette
const darkBlue = '#03045E';
const oceanBlue = '#0077B6';
const paleBlue = '#CAF0F8';
const white = '#FFFFFF';
const lightHoverBlue = '#E8F6FA';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
const PageBackground = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
`;

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  @media (max-width: 1024px) {
    max-width: 900px;
    padding: 1.75rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;


const ProfileSection = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;


const PageWrapper = styled.div`
  padding: 2rem;
  background: #f5f5f5;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;



const CenterContent = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(3, 4, 94, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
  }
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(3, 4, 94, 0.2);
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.3s ease-out;
  border: 1px solid rgba(0, 119, 182, 0.1);

  @media (max-width: 768px) {
    max-width: 95% !important;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    max-width: 100% !important;
    max-height: 95vh;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 119, 182, 0.1);
  background: linear-gradient(135deg, ${paleBlue} 0%, ${white} 100%);

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${darkBlue};
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: ${oceanBlue};
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${lightHoverBlue};
    color: ${darkBlue};
    transform: rotate(90deg);
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding: 0.3rem;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 0.75rem;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${paleBlue};
    border-radius: 5px;
    margin: 5px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, ${oceanBlue} 0%, #90CDF4 100%);
    border-radius: 5px;
    border: 2px solid ${white};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #3182CE 0%, #90CDF4 100%);
    box-shadow: 0 2px 4px rgba(0, 119, 182, 0.3);
  }

  scrollbar-width: thin;
  scrollbar-color: ${oceanBlue} ${paleBlue};
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 119, 182, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: ${paleBlue};

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  background: ${oceanBlue};
  color: white;
  
  &:hover {
    background: ${darkBlue};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.85rem;
    gap: 6px;
    width: 100%;
    justify-content: center;
  }
`;

const CropContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CropSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${darkBlue};
  font-size: 1rem;
  font-weight: 600;
`;

const SectionDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.875rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const CropImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  pointer-events: none;
`;

const CropBox = styled.div`
  position: absolute;
  border: 2px solid ${oceanBlue};
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  cursor: move;
  user-select: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: white;
    opacity: 0.5;
  }
  
  &::before {
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-50%);
  }
  
  &::after {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    transform: translateX(-50%);
  }
`;

// const ResizeHandle = styled.div`

//   position: absolute;
//   width: 14px;
//   height: 14px;
//   background: ${oceanBlue};
//   border: 2px solid white;
//   border-radius: 50%;
//   z-index: 10;
  
//   &.top-left { 
//     top: -7px; 
//     left: -7px; 
//     cursor: nw-resize; 
//   }
//   &.top-right { 
//     top: -7px; 
//     right: -7px; 
//     cursor: ne-resize; 
//   }
//   &.bottom-left { 
//     bottom: -7px; 
//     left: -7px; 
//     cursor: sw-resize; 
//   }
//   &.bottom-right { 
//     bottom: -7px; 
//     right: -7px; 
//     cursor: se-resize; 
//   }
// `;

// const PreviewCircle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   overflow: hidden;
//   border: 3px solid ${oceanBlue};
//   background: #f0f0f0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto;
  
//   canvas {
//     width: 100%;
//     height: 100%;
//   }
// `;
const ResizeHandle = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  background: ${oceanBlue};
  border: 2px solid white;
  border-radius: 50%;
  z-index: 10;

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }

  &.top-left { top: -11px; left: -11px; }
  &.top-right { top: -11px; right: -11px; }
  &.bottom-left { bottom: -11px; left: -11px; }
  &.bottom-right { bottom: -11px; right: -11px; }
`;


const PreviewCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${oceanBlue};
  margin: 0 auto;

  canvas {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;


const PhotoDisplay = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProfileCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${oceanBlue};
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

// const ProfileCircle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   overflow: hidden;
//   border: 3px solid ${oceanBlue};
//   background: #f0f0f0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
  
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   justify-content: center;
//   flex-wrap: wrap;
// `;
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;


const Button = styled.button`
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-size: 0.95rem;
  
  ${props => props.$primary ? `
    background: ${oceanBlue};
    color: white;
    
    &:hover {
      background: ${darkBlue};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
    }
  ` : `
    background: ${white};
    color: ${oceanBlue};
    border-color: rgba(0, 119, 182, 0.3);
    
    &:hover {
      border-color: ${oceanBlue};
      background: ${lightHoverBlue};
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const InfoText = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.875rem;
  margin: 0;
`;

const LinkText = styled.span`
  color: ${oceanBlue};
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProfilePhotoUpload = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeCorner, setResizeCorner] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, cropX: 0, cropY: 0, cropWidth: 0, cropHeight: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setStep('crop');
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert('File size must be less than 2MB');
    }
  };

  const handleImageLoad = () => {
    if (imageRef.current && containerRef.current) {
      const img = imageRef.current;
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      const scale = Math.min(
        containerWidth / img.naturalWidth,
        containerHeight / img.naturalHeight
      );
      
      const displayWidth = img.naturalWidth * scale;
      const displayHeight = img.naturalHeight * scale;
      
      const offsetX = (containerWidth - displayWidth) / 2;
      const offsetY = (containerHeight - displayHeight) / 2;
      
      setImageSize({ width: displayWidth, height: displayHeight });
      setImageOffset({ x: offsetX, y: offsetY });
      
      const size = Math.min(displayWidth, displayHeight) * 0.7;
      setCropBox({
        x: offsetX + (displayWidth - size) / 2,
        y: offsetY + (displayHeight - size) / 2,
        width: size,
        height: size
      });
    }
  };

  const handleMouseDown = (e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (corner) {
      setResizeCorner(corner);
    } else {
      setIsDragging(true);
    }
    
    setDragStart({ 
      x: e.clientX, 
      y: e.clientY,
      cropX: cropBox.x,
      cropY: cropBox.y,
      cropWidth: cropBox.width,
      cropHeight: cropBox.height
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging && !resizeCorner) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (isDragging) {
      const newX = dragStart.cropX + deltaX;
      const newY = dragStart.cropY + deltaY;
      
      const minX = imageOffset.x;
      const minY = imageOffset.y;
      const maxX = imageOffset.x + imageSize.width - cropBox.width;
      const maxY = imageOffset.y + imageSize.height - cropBox.height;
      
      setCropBox(prev => ({
        ...prev,
        x: Math.max(minX, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY))
      }));
    } else if (resizeCorner) {
      let newX = dragStart.cropX;
      let newY = dragStart.cropY;
      let newWidth = dragStart.cropWidth;
      let newHeight = dragStart.cropHeight;
      
      const minSize = 50;
      const maxWidth = imageOffset.x + imageSize.width - newX;
      const maxHeight = imageOffset.y + imageSize.height - newY;
      
      if (resizeCorner === 'top-left') {
        const delta = Math.min(deltaX, deltaY);
        newX = dragStart.cropX + delta;
        newY = dragStart.cropY + delta;
        newWidth = dragStart.cropWidth - delta;
        newHeight = dragStart.cropHeight - delta;
        
        if (newX < imageOffset.x) {
          const diff = imageOffset.x - newX;
          newX = imageOffset.x;
          newWidth += diff;
          newHeight += diff;
        }
        if (newY < imageOffset.y) {
          const diff = imageOffset.y - newY;
          newY = imageOffset.y;
          newWidth += diff;
          newHeight += diff;
        }
      } else if (resizeCorner === 'top-right') {
        const delta = Math.max(deltaX, -deltaY);
        newY = dragStart.cropY - delta;
        newWidth = dragStart.cropWidth + delta;
        newHeight = dragStart.cropHeight + delta;
        
        if (newY < imageOffset.y) {
          const diff = imageOffset.y - newY;
          newY = imageOffset.y;
          newWidth -= diff;
          newHeight -= diff;
        }
      } else if (resizeCorner === 'bottom-left') {
        const delta = Math.max(-deltaX, deltaY);
        newX = dragStart.cropX - delta;
        newWidth = dragStart.cropWidth + delta;
        newHeight = dragStart.cropHeight + delta;
        
        if (newX < imageOffset.x) {
          const diff = imageOffset.x - newX;
          newX = imageOffset.x;
          newWidth -= diff;
          newHeight -= diff;
        }
      } else if (resizeCorner === 'bottom-right') {
        const delta = Math.max(deltaX, deltaY);
        newWidth = dragStart.cropWidth + delta;
        newHeight = dragStart.cropHeight + delta;
      }
      
      // Ensure square and within bounds
      const size = Math.max(minSize, Math.min(newWidth, newHeight, maxWidth, maxHeight));
      
      // Adjust position if needed
      if (newX + size > imageOffset.x + imageSize.width) {
        newX = imageOffset.x + imageSize.width - size;
      }
      if (newY + size > imageOffset.y + imageSize.height) {
        newY = imageOffset.y + imageSize.height - size;
      }
      
      setCropBox({
        x: newX,
        y: newY,
        width: size,
        height: size
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizeCorner(null);
  };

  const updatePreview = () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    canvas.width = 200;
    canvas.height = 200;

    // Clear canvas
    ctx.clearRect(0, 0, 200, 200);

    // Calculate source coordinates
    const scale = img.naturalWidth / imageSize.width;
    const sourceX = (cropBox.x - imageOffset.x) * scale;
    const sourceY = (cropBox.y - imageOffset.y) * scale;
    const sourceSize = cropBox.width * scale;

    // Create circular clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw image
    ctx.drawImage(
      img,
      sourceX, sourceY, sourceSize, sourceSize,
      0, 0, 200, 200
    );
    
    ctx.restore();
  };

  useEffect(() => {
    if (step === 'crop' && selectedImage && imageSize.width > 0) {
      updatePreview();
    }
  }, [cropBox, selectedImage, step, imageSize]);

  useEffect(() => {
    if (isDragging || resizeCorner) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, resizeCorner, dragStart, cropBox, imageSize, imageOffset]);

  const handleSavePhoto = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setProfilePhoto(dataUrl);
      setShowModal(false);
      setStep('upload');
      setSelectedImage(null);
    }
  };

  const handleDeletePhoto = () => {
    setProfilePhoto(null);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setStep('upload');
    setSelectedImage(null);
  };

  return (
    // <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: '100vh', maxWidth: 1000 }}>
     
    // </div>
   <PageBackground>
  <PageContainer>
    <ProfileSection>
      <ProfileCircle
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer', margin: '0 auto' }}
      >
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" />
        ) : (
          <div style={{ color: '#999', fontSize: '3rem' }}>👤</div>
        )}
      </ProfileCircle>

      <Button
        $primary
        onClick={() => setShowModal(true)}
        style={{ marginTop: '1rem' }}
      >
        {profilePhoto ? 'Replace photo' : 'Add photo'}
      </Button>

      {!profilePhoto && (
        <div
          style={{
            marginTop: '0.5rem',
            color: '#d32f2f',
            fontSize: '0.875rem',
          }}
        >
          {/* Profile completion: 10% */}
        </div>
      )}
    </ProfileSection>

    {showModal && (
      <ModalOverlay
        onClick={(e) =>
          e.target === e.currentTarget && handleModalClose()
        }
      >
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>
              {step === 'upload'
                ? 'Profile photo upload'
                : 'Adjust photo'}
            </ModalTitle>
            <CloseButton onClick={handleModalClose}>×</CloseButton>
          </ModalHeader>

          <ModalBody>
            {step === 'upload' && (
              <PhotoDisplay>
                {profilePhoto ? (
                  <>
                    <ProfileCircle>
                      <img
                        src={profilePhoto}
                        alt="Current profile"
                      />
                    </ProfileCircle>
                    <ButtonGroup>
                      <Button
                        $primary
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                      >
                        Replace photo
                      </Button>
                      <Button onClick={handleDeletePhoto}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  </>
                ) : (
                  <>
                    <ProfileCircle>
                      <div
                        style={{
                          color: '#ccc',
                          fontSize: '4rem',
                        }}
                      >
                        👤
                      </div>
                    </ProfileCircle>
                    <Button
                      $primary
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                    >
                      Upload photo
                    </Button>
                  </>
                )}
                <InfoText>
                  Supported file formats: PNG, JPG, JPEG,
                  GIF – up to 2MB
                </InfoText>
              </PhotoDisplay>
            )}

            {step === 'crop' && (
              <CropContainer>
                <CropSection>
                  <SectionTitle>
                    Adjust photo
                  </SectionTitle>
                  <SectionDescription>
                    Drag the box to reposition. Use
                    corner handles to resize.
                  </SectionDescription>

                  <ImageContainer ref={containerRef}>
                    <CropImage
                      ref={imageRef}
                      src={selectedImage}
                      alt="Crop"
                      onLoad={handleImageLoad}
                      draggable={false}
                    />

                    {imageSize.width > 0 && (
                      <CropBox
                        style={{
                          left: `${cropBox.x}px`,
                          top: `${cropBox.y}px`,
                          width: `${cropBox.width}px`,
                          height: `${cropBox.height}px`,
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(e, null)
                        }
                      >
                        <ResizeHandle
                          className="top-left"
                          onMouseDown={(e) =>
                            handleMouseDown(
                              e,
                              'top-left'
                            )
                          }
                        />
                        <ResizeHandle
                          className="top-right"
                          onMouseDown={(e) =>
                            handleMouseDown(
                              e,
                              'top-right'
                            )
                          }
                        />
                        <ResizeHandle
                          className="bottom-left"
                          onMouseDown={(e) =>
                            handleMouseDown(
                              e,
                              'bottom-left'
                            )
                          }
                        />
                        <ResizeHandle
                          className="bottom-right"
                          onMouseDown={(e) =>
                            handleMouseDown(
                              e,
                              'bottom-right'
                            )
                          }
                        />
                      </CropBox>
                    )}
                  </ImageContainer>

                  <InfoText>
                    Not satisfied with the photo?{' '}
                    <LinkText
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                    >
                      Change photo
                    </LinkText>
                  </InfoText>
                </CropSection>

                <CropSection>
                  <SectionTitle>Preview</SectionTitle>
                  <SectionDescription>
                    This is how your photo will appear.
                  </SectionDescription>
                  <PreviewCircle>
                    <canvas ref={canvasRef} />
                  </PreviewCircle>
                </CropSection>
              </CropContainer>
            )}
          </ModalBody>

          {step === 'crop' && (
            <ModalFooter>
              <ActionButton onClick={handleSavePhoto}>
                Save photo
              </ActionButton>
            </ModalFooter>
          )}

          <FileInput
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif"
            onChange={handleFileSelect}
          />
        </ModalContainer>
      </ModalOverlay>
    )}
  </PageContainer>
</PageBackground>


    
  );
};

export default ProfilePhotoUpload;