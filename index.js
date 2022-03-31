const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

const contractAddress = '0xcFCAD0e5794C13927AfF00B77d6535c9eb1e8d8e';

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(abi, contractAddress);

let account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Falha ao obter conta");
    return;
  }
  if (accounts.length == 0) {
    alert("Não foi possível acessar contas");
    return;
  }
  account = accounts[0];
  console.log('Conta: ' + account);
  web3.eth.defaultAccount = account;
});

function setUser() {
  name = $("#userName").val();
  age = $("#userAge").val();
  contract.methods.setUser (name, age).send( {from: account}).then( function(tx) { 
    console.log("Usuário registrado na transação: ", tx); 
  });
  $("#userName").val('');
  $("#userAge").val('')
}

function getUser() {
  contract.methods.getUser().call().then( function( result ) {
    console.log(result[0], result[1])
    document.getElementById('user').innerHTML = ("Nome: " + result[0] + " " + "Idade:  " + result[1]);
  });    
}
