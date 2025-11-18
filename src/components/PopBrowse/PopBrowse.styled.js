
import styled from 'styled-components';
import { theme } from '../../theme';

export const StyledPopBrowse = styled.div`
  display: none;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
`;

export const StyledPopBrowseContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const StyledPopBrowseBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${theme.colors.cardBackground};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  position: relative;
`;

export const StyledPopBrowseContent = styled.div`
  display: block;
  text-align: left;
`;

export const StyledPopBrowseTopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const StyledPopBrowseTtl = styled.h3`
  color: ${theme.colors.text};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const StyledPopBrowseStatus = styled.div`
  margin-bottom: 11px;
`;

export const StyledStatusP = styled.p`
  margin-bottom: 14px;
`;

export const StyledStatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StyledStatusTheme = styled.div`
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: ${theme.colors.secondary};
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
`;

export const StyledPopBrowseWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledPopBrowseForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
`;

export const StyledFormBrowseBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledFormBrowseArea = styled.textarea`
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #EAEEF6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
`;

export const StyledPopBrowseBtnBrowse = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledBtnGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledBtnBrowseEdit = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  border: none;
  color: ${theme.colors.white};
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
`;

export const StyledBtnBrowseDelete = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: transparent;
  border: 0.7px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
`;

export const StyledBtnBrowseClose = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  border: none;
  color: ${theme.colors.white};
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
`;

export const StyledPopBrowseBtnEdit = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledBtnEditEdit = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  border: none;
  color: ${theme.colors.white};
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
`;

export const StyledBtnEditDelete = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: transparent;
  border: 0.7px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
`;

export const StyledBtnEditClose = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  border: none;
  color: ${theme.colors.white};
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
`;