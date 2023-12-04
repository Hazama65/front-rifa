import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

export const alertAdapter = {
  alertLoading: (title: string) => {
    MySwal.fire({
        title: <p>{title}</p>,
        didOpen: () => {
          MySwal.showLoading()
        },
    })
  },
  stopLoading: () => Swal.close()
}