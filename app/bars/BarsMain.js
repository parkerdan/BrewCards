'use strict'

// React
import React from 'react';
import { View, ListView } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { getBars } from './actions';
import { pushRoute } from '../navigation/actions';

// Style
import { spinner, loading, noSpinner  } from '../styles/loading';
import { header, headerHeight, headerColor, settingsIcon } from '../styles/header';

// Views
import LoadingView from 'rn-loading-view';
import Header from 'rn-header';
import Footer from '../components/Footer';
import BarRow from '../components/BarRow';
import BarSectionHeader from '../components/BarSectionHeader';

// Routes
import { Settings, BarDetail } from '../navigation/routes';


const mapStateToProps = (state) => {
  return {bars:state.bars}
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBars: () => dispatch(getBars()),
    pushRoute: (route) => dispatch(pushRoute(route))
  }
};

class BarsMain extends React.Component {

  componentDidMount(){
    this.props.getBars();
  };

  render(){
      return(
        <View style={loading.container}>
          <Header
            backgroundColor={ headerColor }
            height={ headerHeight }
            centerText={ 'Brew Cards' }
            centerTextProps={{ style:header.centerText }}
            rightIconProps={ settingsIcon }
            onRightPress={ () => this.props.pushRoute(Settings) }
          />
          { this.renderLoading() }
          <Footer/>
        </View>
      )
  };

  renderLoading(){
    if ( !this.props.bars.dataSource ) {
      let { requestError, errorMessage } = this.props.bars;

      return(
        <LoadingView
          text={ (requestError) ? '':'Getting information...' }
          textProps={{ style: loading.text }}
          renderButton={ requestError }
          spinnerProps={ (requestError) ? noSpinner:spinner }
          buttonText={ errorMessage }
          buttonTextProps={{ style: loading.buttonText }}
          buttonProps={{
            style: loading.button,
            onPress: () => this.props.getBars()
          }}
        />
      )
    } else {
      return this.renderMainView()
    }
  };

  renderMainView(){
    return(
      <ListView
        style={{flex:1}}
        dataSource={ this.props.bars.dataSource }
        renderRow={
          (data,sectionId,rowId) => {
            return(
              <BarRow
                key={data.id}
                data={data}
                onPress={ () => this.props.pushRoute({...BarDetail,id:data.id}) }
              />
            )
          }
        }
        renderSectionHeader={
          (sectionData, sectionID) => {
            return(
              <BarSectionHeader
                key={sectionID}
                count={sectionData.length}
                title={sectionID}
              />
            )
          }
        }
      />
    )
  };

};

export default connect(mapStateToProps,mapDispatchToProps)(BarsMain)
