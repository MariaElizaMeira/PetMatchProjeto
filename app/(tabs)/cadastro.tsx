import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Pet {
  nome: string;
  tipo: string;
  sexo: string;
  castrado: string;
  raca: string;
  aniversario: string;
  vacinas: string;
  dataUltimaVacina: string;
  vermifugado: string;
  dataUltimaVermifugacao: string;
  possuiDoenca: string;
  temperamento: string;
  sobrePet: string;
}

const CadastroScreen = () => {
  const [tipoPet, setTipoPet] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [nomePet, setNomePet] = useState('');
  const [sexoPet, setSexoPet] = useState('');
  const [castrado, setCastrado] = useState('');
  const [raca, setRaca] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [vacinas, setVacinas] = useState('');
  const [dataUltimaVacina, setDataUltimaVacina] = useState('');
  const [vermifugado, setVermifugado] = useState('');
  const [dataUltimaVermifugacao, setDataUltimaVermifugacao] = useState('');
  const [possuiDoenca, setPossuiDoenca] = useState('');
  const [temperamento, setTemperamento] = useState('');
  const [sobrePet, setSobrePet] = useState('');
  const [petCadastrado, setPetCadastrado] = useState<Pet | null>(null);

  const [showVacinaPicker, setShowVacinaPicker] = useState(false);
  const [showVermifugacaoPicker, setShowVermifugacaoPicker] = useState(false);

  const handlePetSelection = (tipo: string) => {
    setTipoPet(tipo);
    setFormVisible(true);
  };

  const handleCadastro = () => {
    const pet: Pet = {
      nome: nomePet,
      tipo: tipoPet,
      sexo: sexoPet,
      castrado,
      raca,
      aniversario,
      vacinas,
      dataUltimaVacina,
      vermifugado,
      dataUltimaVermifugacao,
      possuiDoenca,
      temperamento,
      sobrePet,
    };
    setPetCadastrado(pet);
    setFormVisible(false);
  };

  const handleNovoCadastro = () => {
    setPetCadastrado(null);
    setNomePet('');
    setSexoPet('');
    setCastrado('');
    setRaca('');
    setAniversario('');
    setVacinas('');
    setDataUltimaVacina('');
    setVermifugado('');
    setDataUltimaVermifugacao('');
    setPossuiDoenca('');
    setTemperamento('');
    setSobrePet('');
    setTipoPet('');
    setFormVisible(false);
  };

  const dropdownData = [
    { label: 'Sim', value: 'Sim' },
    { label: 'Não', value: 'Não' },
  ];

  const dropdownSexo = [
    { label: 'Macho', value: 'Macho' },
    { label: 'Fêmea', value: 'Fêmea' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastre seu pet</Text>
      {!formVisible && !petCadastrado && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => handlePetSelection('Gato')}>
            <Text style={styles.buttonText}>Gato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePetSelection('Cachorro')}>
            <Text style={styles.buttonText}>Cachorro</Text>
          </TouchableOpacity>
        </View>
      )}

      {formVisible && (
        <View style={styles.form}>
          <Text style={styles.label}>Nome do Pet</Text>
          <TextInput style={styles.input} value={nomePet} onChangeText={setNomePet} />

          <Text style={styles.label}>Sexo do Pet</Text>
          <Dropdown
            style={styles.dropdown}
            data={dropdownSexo}
            labelField="label"
            valueField="value"
            value={sexoPet}
            onChange={(item) => setSexoPet(item.value)}
            placeholder="Selecione"
          />

          <Text style={styles.label}>Castrado</Text>
          <Dropdown
            style={styles.dropdown}
            data={dropdownData}
            labelField="label"
            valueField="value"
            value={castrado}
            onChange={(item) => setCastrado(item.value)}
            placeholder="Selecione"
          />

          <Text style={styles.label}>Raça</Text>
          <TextInput style={styles.input} value={raca} onChangeText={setRaca} />

          <Text style={styles.label}>Aniversário (Ano)</Text>
          <TextInput
            style={styles.input}
            value={aniversario}
            onChangeText={setAniversario}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Vacinas</Text>
          <TextInput style={styles.textArea} value={vacinas} onChangeText={setVacinas} multiline />

          <Text style={styles.label}>Data da Última Vacina</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowVacinaPicker(true)}
          >
            <Text>{dataUltimaVacina || 'Selecione uma data'}</Text>
          </TouchableOpacity>
          {showVacinaPicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(event, date) => {
                setShowVacinaPicker(false);
                if (date) setDataUltimaVacina(date.toISOString().split('T')[0]);
              }}
            />
          )}

          <Text style={styles.label}>Vermifugado</Text>
          <Dropdown
            style={styles.dropdown}
            data={dropdownData}
            labelField="label"
            valueField="value"
            value={vermifugado}
            onChange={(item) => setVermifugado(item.value)}
            placeholder="Selecione"
          />

          <Text style={styles.label}>Data da Última Vermifugação</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowVermifugacaoPicker(true)}
          >
            <Text>{dataUltimaVermifugacao || 'Selecione uma data'}</Text>
          </TouchableOpacity>
          {showVermifugacaoPicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(event, date) => {
                setShowVermifugacaoPicker(false);
                if (date) setDataUltimaVermifugacao(date.toISOString().split('T')[0]);
              }}
            />
          )}

          <Text style={styles.label}>Possui Doença?</Text>
          <Dropdown
            style={styles.dropdown}
            data={dropdownData}
            labelField="label"
            valueField="value"
            value={possuiDoenca}
            onChange={(item) => setPossuiDoenca(item.value)}
            placeholder="Selecione"
          />

          <Text style={styles.label}>Temperamento</Text>
          <TextInput style={styles.input} value={temperamento} onChangeText={setTemperamento} />

          <Text style={styles.label}>Sobre o Pet</Text>
          <TextInput style={styles.textArea} value={sobrePet} onChangeText={setSobrePet} multiline />

          <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      )}

      {petCadastrado && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pet Cadastrado</Text>
          {Object.entries(petCadastrado).map(([key, value]) => (
            <Text key={key} style={styles.cardText}>
              {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
            </Text>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleNovoCadastro}>
            <Text style={styles.buttonText}>Cadastrar mais um pet</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f2f4',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#761e4a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cadastrarButton: {
    backgroundColor: '#761e4a',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default CadastroScreen;
