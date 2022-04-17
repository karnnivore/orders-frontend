import { Box, Button, Modal } from "@mui/material"

interface IUpdateOrder {
  open: boolean
  handleUpdateClose: () => void
}
export const UpdateOrder = ({
  open,
  handleUpdateClose
}: IUpdateOrder) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  return(
    <Modal
      open={open}
      onClose={handleUpdateClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div>
          <Button variant='contained'>Update</Button>
          <Button variant='outlined'>Cancel</Button>
        </div>
      </Box>
    </Modal>
  )
}