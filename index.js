const { Command } = require('commander');
const chalkAnimation = require('chalkercli');
const axios = require('axios')

const program = new Command()

program
    .name('Currency Converter')
    .description('CONVERTER')
    .version('0.8.0')


program
    .command('CURR')
    .description('Currencies')
    .action(() => {
        axios.get('https://currency-exchange.p.rapidapi.com/listquotes', {
            headers : {
                'X-RapidAPI-Key': '8be299a4b7msh030f96918dfad2cp1adf6fjsndebda7ba8466',
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        }).then(res => {
            res.data.forEach(e => {
                const temp = chalkAnimation.neon(e);
                temp.start()
                temp.stop()
            })
        }).catch(err => {
            console.log(err)
        })
    })

program.command('CONV')
    .description('Currency Converter')
    .argument('<string>', 'CURRENCY CONVERTER')
    .option('--first', 'EX. CUR1_CUR2_AMOUNT', '_')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;

        const CURR_ARR = str.split('_')

        // console.log(limit, str, options);

        if(limit === 1) {
            axios.get('https://currency-exchange.p.rapidapi.com/exchange', {
                headers : {
                    'X-RapidAPI-Key': '8be299a4b7msh030f96918dfad2cp1adf6fjsndebda7ba8466',
                    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                },
                params : {
                    from: CURR_ARR[0].toUpperCase(),
                    to: CURR_ARR[1].toUpperCase(),
                    q: CURR_ARR[2]
                }
            }).then(res => {
                const AMOUNT = chalkAnimation.rainbow((res.data * CURR_ARR[2]).toString());
                AMOUNT.start()
                AMOUNT.stop()

            }).catch(err => {
                console.log(err)
            })
        }


    });

program.parse();