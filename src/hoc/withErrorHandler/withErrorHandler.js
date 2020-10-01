import React, { Component, Fragment } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorMessage = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });

      this.resonseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error,
          });
        }
      );
    }

    componentWillUnmount() {
      // axios.interceptors.eject(this.requestInterceptor);
      // axios.interceptors.eject(this.resonseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null,
      });
    };

    render() {
      const { error } = this.state;
      return (
        <Fragment>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorMessage;
