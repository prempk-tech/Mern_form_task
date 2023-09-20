import moment from 'moment';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { readFile } from 'fs/promises';
import { format, lightFormat, parseISO } from 'date-fns';

export default {
    replaceSettingVars: (template, userData, setting) => {
        console.log("htmluserdata",userData);
        let markup = template;
        markup = markup.replace(/{image}/g, userData.image);
        markup = markup.replace(/{firstname}/g, userData.firstname);
        markup = markup.replace(/{lastname}/g, userData.lastname);
        markup = markup.replace(/{email}/g, userData.email);
        markup = markup.replace(/{mobileno}/g, userData.mobileno);
        markup = markup.replace(/{DOB}/g, userData.DOB);
        markup = markup.replace(/{role}/g, userData.role);
        markup = markup.replace(/{state}/g, userData.state);
        markup = markup.replace(/{gender}/g, userData.gender);
        markup = markup.replace(/{postcode}/g, userData.postcode);
        
    
        // let siteURL = setting.siteURL;
        // let nodeURL = 'http://localhost:4001/';
        // if (!siteURL.endsWith('/')) {
        //   siteURL = siteURL + '/';
        // }
        // if (siteURL.startsWith('http')) {
        //   siteURL = 'https://' + siteURL.replace(/(^\w+:|^)\/\//, '');
        // }
        // if (userData.production_barcode) {
        //   markup = markup.replace(/{production.barcode}/g, production.production_barcode);
        // }
        // markup = markup.replace(/{}/g, siteURL);
        // markup = markup.replace(/{doncasterNode.url}/g, nodeURL);
    
        return markup;
      },
generateUserPDF: ({ markup, userData }) => {
    const compiled = _.template(markup);
    // let JSN_no=production.JSN_no
    // let product_name=production.product_name
    // let dateOfStock = format(new Date(production.dateOfStock), 'dd/MM/yyyy');
    // let weight=production.weight
    // let condition=production.condition
    // let itemDetagged=production.itemDetagged
    // let nameOfEmployee=production.nameOfEmployee

    // let closingDate;
    // if (tender?.closingDate) closingDate = format(new Date(tender.closingDate), 'dd/MM/yyyy');

    // const totalWords = tender.questions.reduce((sum, question) => {
    //   sum += Number(question.noOfWords ?? 0);
    //   return sum;
    // }, 0);

    // const timeRequired = tender.questions.reduce((sum, question) => {
    //   sum += Number(question.reqTimeToComplete ?? 0);
    //   return sum;
    // }, 0);

    // const totalCharge = Number(tender.totalCharge.toFixed(2));
    // const vatPrice = Number((totalCharge * (vat / 100)).toFixed(2));
    // const totalPrice = tender.totalCharge + vatPrice;

    return compiled({
        userData: {
        ...userData,
      },
    });
  }
}