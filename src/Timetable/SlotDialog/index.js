import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GridContext } from 'shared/contexts';
import { useContext, useEffect, useState } from 'react';

const propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  slotId: PropTypes.number,
  leftColumnElements: PropTypes.arrayOf(PropTypes.string).isRequired,
  thElements: PropTypes.arrayOf(PropTypes.string).isRequired
};

const defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  onDelete: () => {},
  slotId: null
};

const SlotDialog = ({ onClose, onSubmit, onDelete, slotId, leftColumnElements, thElements }) => {
  const { findItemById } = useContext(GridContext);

  const [course, setCourse] = useState('');
  const [color, setColor] = useState('');
  const [instructor, setInstructor] = useState('');
  const [location, setLocation] = useState('');
  const [validated, setValidated] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  
  useEffect(() => {
    const { item, rowIndex, columnIndex } = findItemById(slotId);

    if (item) {
      setCourse(item.course);
      setColor(item.color);
      setInstructor(item.instructor);
      setLocation(item.location);
      setModalTitle(`${item.draggable ? 'Edit' : 'Add'} | ${thElements[columnIndex]} ${leftColumnElements[rowIndex]}`);
    } else {
      resetForm();
    }

  }, [slotId]);

  const resetForm = () => {
    setCourse('');
    setColor('');
    setInstructor('');
    setLocation('');
    setValidated(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      return setValidated(true);
    }

    onSubmit({
      course,
      color,
      instructor,
      location,
      draggable: true
    });
  };

  const handleDelete = () => {
    onDelete(slotId);
  };

  return (
    <Modal.Dialog
      className='position-absolute m-0'
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Modal.Header closeButton onHide={onClose}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          id='timeslot-form'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <Form.Group className='mb-3 d-flex align-items-center' controlId='formCourseTitle'>
            <Form.Label className='mb-0 w-50'>Course</Form.Label>
            <Form.Control
              required
              value={course}
              onChange={({ target }) => setCourse(target.value)}
              name='course'
              className='ms-2'
              type='text'
              placeholder='required'
            />
          </Form.Group>
          <Form.Group className='mb-3 d-flex align-items-center' controlId='formCourseColor'>
            <Form.Label className='mb-0 w-50'>Color</Form.Label>
            <Form.Control
              className='w-100 ms-2'
              value={color}
              onChange={({ target }) => setColor(target.value)}
              type='color'
            />
          </Form.Group>
          <Form.Group className='mb-3 d-flex align-items-center' controlId='formCourseInstructor'>
            <Form.Label className='mb-0 w-50'>Instructor</Form.Label>
            <Form.Control
              value={instructor}
              onChange={({ target }) => setInstructor(target.value)}
              className='ms-2'
              type='text'
              placeholder='optional'
            />
          </Form.Group>
          <Form.Group className='mb-3 d-flex align-items-center' controlId='formCourseLocation'>
            <Form.Label className='mb-0 w-50'>Location</Form.Label>
            <Form.Control
              value={location}
              onChange={({ target }) => setLocation(target.value)}
              className='ms-2'
              type='text'
              placeholder='optional (ex. 201)'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-around'>
        <div className='w-50 m-0 p-1'>
          <Button className='w-100' variant='danger' onClick={handleDelete}>Delete</Button>
        </div>
        <div className='w-50 m-0 p-1'>
          <Button className='w-100' type='submit' form='timeslot-form'>Save</Button>
        </div>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

SlotDialog.propTypes = propTypes;
SlotDialog.defaultProps = defaultProps;

export default SlotDialog;
