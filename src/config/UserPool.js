import { CognitoUserPool } from 'amazon-cognito-identity-js';

let poolData = {
    UserPoolId: 'us-east-1_SzubVB2Wx',
    ClientId: '4gjkaose7v4olc8mvsd40nf11f'
};


export default new CognitoUserPool(poolData);