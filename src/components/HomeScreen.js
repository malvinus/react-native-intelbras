import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';


class HomeScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Intelbras',
    };
    
    render() {
        return (
        <View style={{backgroundColor: '#FFFFFF'}}>
            <View style={ styles.container }>
                <Text>Lista de Clientes</Text>
                <Button
                    title="+"
                    onPress={() => this.props.navigation.navigate('CadastroCliente')}
                    style={ styles.button }
                />
            </View>
            <View style={ styles.container }>
                <Text>Perfil Cliente</Text>
                <Button
                    title="----->"
                    onPress={() => this.props.navigation.navigate('Cliente')}
                    style={ styles.button }
                />
            </View>
        </View>
        );
    }    
}

const styles = StyleSheet.create ({ 
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
    },
    button: {
        width: 100,
        height: 50,
    }
});

export default HomeScreen;

