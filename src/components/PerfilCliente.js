import React from 'react';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import NovoButton from './NovoButton';
import EquipamentoButton from './EquipamentoButton';
import { StyleSheet, Button, View, Text, TextInput, AsyncStorage, Alert } from 'react-native';


class PerfilCliente extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });
    async componentWillMount() {
        let { navigation } = this.props;
        let idCliente = navigation.getParam('id');
        let listaClientes = navigation.getParam('listaClientes');
        let cliente = listaClientes[idCliente];

        this.setState({id: idCliente});
        this.setState({telefone: cliente.telefone});
        this.setState({endereco: cliente.endereco});
        this.setState({listaClientes});
    }

    refresh = (equipamentos) => {
        this.setState({equipamentos});
    } 

    removerCliente = () => {
        let listaClientes = this.state.listaClientes;
        listaClientes.splice(this.state.id, 1);
        AsyncStorage.setItem('clientes', JSON.stringify(listaClientes));
        this.props.navigation.state.params.refreshHomeScreen(listaClientes);
        this.props.navigation.goBack();
    }
    
    listaEquipamentos() {
        let { navigation } = this.props;
        let idCliente = navigation.getParam('id');
        let listaClientes = navigation.getParam('listaClientes');
        let cliente = listaClientes[idCliente];

        if (!cliente || !cliente.hasOwnProperty('equipamentos')) return;

        return cliente.equipamentos.map((equipamento, key) => {
            return (
                <EquipamentoButton 
                listaEquipamentos={cliente.equipamentos}
                id={key}
                nome={cliente.equipamentos[key].nome}
                navigation={this.props.navigation}
                />
            );
        });
    }

    render() {
        let { navigation } = this.props;
        let idCliente = navigation.getParam('id');
        let listaClientes = navigation.getParam('listaClientes');

        return (
        <View style={{backgroundColor: '#FFFFFF'}}>
            <View style={ styles.container }>
                <View>
                    <Text style={ styles.info }> Telefone: { this.state.telefone } </Text>
                </View>
                <View>
                    <Text style={ styles.info }> Endereço: { this.state.endereco } </Text>
                </View>
            </View>
            <View style={ styles.buttons }>
                <Text 
                style={ styles.buttonExcluir }
                onPress={ this.removerCliente }>
                    Excluir cliente
                </Text>
                <Text
                style={ styles.buttonNovoEquipamento }
                onPress={() => this.props.navigation.navigate('CadastroEquipamento', 
                    {idCliente, listaClientes, refreshPerfilCliente: this.refresh})}
                >
                Novo equipamento
                </Text>
            </View>
            <View> 
                {this.listaEquipamentos()} 
            </View>
        </View>
        );
    } 
}

const styles = StyleSheet.create ({ 
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info: {
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center'
    },
    buttonExcluir: {
        backgroundColor: '#D72736',
        height: 50,
        width: '50%',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 10,
        fontSize: 20
    },
    buttonNovoEquipamento: {
        backgroundColor: '#27BDBE',
        height: 50,
        width: '50%',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 10,
        fontSize: 20
    },
    button: {
        width: 100,
        height: 50,
    }
});

export default PerfilCliente;