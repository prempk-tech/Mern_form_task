import catchAsync from "../utils/catchAsync.js";
import puppeteer from 'puppeteer';
import fs from 'fs';
import ejs from 'ejs'
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import userSchema from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import adminimage from "../models/DashAdmin.js";
import replaceVars from "../models/replaceVars.js";
import Setting from "../models/setting.js";
const salt = 10;

export default function userController(io) {
    const RegisterData = catchAsync(async (req, res) => {
        const reqdata = req.body;
        console.log("imagedata", req.body.image);
        reqdata.country = reqdata.country.map((data) => data?.value)
        reqdata.city = reqdata.city.map((data) => data?.value)
        reqdata.state = reqdata.state.map((data) => data?.value)
        reqdata.role = reqdata.role.map((data) => data?.value)

        let userdata = await userSchema.create({ ...reqdata })
sendMail(reqdata)
        res.json({
            data: userdata,
            message: 'Created Successfully'
        })
    });

    const getuser = catchAsync(async (req, res) => {
        const user = await userSchema.find();
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
        }

        res.json(user);
    });


    const getuserDetails = catchAsync(async (req, res) => {
        const userdetails = await userSchema
            .findById(req.params.id)

        if (!userdetails) {
            throw new ApiError(httpStatus.NOT_FOUND, 'userdetails not found ');
        }

        res.json(userdetails);
    });

    const getuserdetailsById = catchAsync(async (req, res) => {
        const userdetails = await userSchema.findById({ _id: req.params.id });
        if (!userdetails) {
            throw new ApiError(httpStatus.NOT_FOUND, 'userdetails not found');
        }

        res.json(userdetails);
    });

    const updateUserDetailsById = catchAsync(async (req, res) => {
console.log("imagedata",req.body.image)
        const userdetails = await userSchema.findByIdAndUpdate(
            { _id: req.params.id },
            { ...req.body }
        );
        if (!userdetails) {
            throw new ApiError(httpStatus.NOT_FOUND, 'userdetails not found');
        }
        res.json({
            data: userdetails,
            message: 'Updated Successfully',
        });
    });

    const deleteUserDetailById = catchAsync(async (req, res) => {

        const userdetails = await userSchema.findByIdAndDelete({ _id: req.params.id });
        console.log('reqDeleteId', userdetails);

        if (!userdetails) {
            throw new ApiError(httpStatus.NOT_FOUND, 'userdetails not found');
        }

        res.json({
            message: 'Deleted Successfully',
        });
    });

    const aggregateUser = catchAsync(async (req, res) => {
        const { search, gender, roles, pageLimit, State, skip } = req.body;
        console.log("skipdata", req.body.skip);
        var pagelimitdata = req.body.pageLimit
        console.log("pagelimitdata", pagelimitdata);
        if (typeof pagelimitdata != 'string') req.body.pageLimit = pagelimitdata?.map((data) => data?.value)

        let pagedata = req.body.pageLimit
        console.log("pagedata", pagedata);
        let query = [];

        if (search !== '') {
            query.push({
                $match: {
                    $or: [
                        {
                            firstname: {
                                $regex: search + '.*',
                                $options: 'si',
                            },
                        },
                        {
                            lastname: {
                                $regex: search + '.*',
                                $options: 'si',
                            },
                        },
                        {
                            email: {
                                $regex: search + '.*',
                                $options: 'si',
                            },
                        },
                        // {
                        //     mobileno: {
                        //     $regex: search + '^\\+|\\d+',
                        //     $options: 'si',
                        //   },
                        // },
                        // {
                        //     role: {
                        //     $regex: search + '.*',
                        //     $options: 'si',
                        //   },
                        // },
                        // {
                        //     gender: {
                        //     $regex: search + '.*',
                        //     $options: 'si',
                        //   },
                        // },
                        // {
                        //     state: {
                        //     $regex: search + '.*',
                        //     $options: 'si',
                        //   },
                        // },
                    ],
                },
            });
        }

        if (gender !== '') {
            query.push({
                $match: {
                    gender: gender,
                },
            });
        }

        if (roles !== '') {
            query.push({
                $match: {
                    role: roles,
                },
            });
        }

        if (State !== '') {
            query.push({
                $match: {
                    state: State,
                },
            });
        }

        const withoutlimit = Object.assign([], query);
        withoutlimit.push({ $count: 'counts' });
        console.log("query", query);

        query.push({
            $sort: { createdAt: -1 },
        });
        console.log("pagelimit", query);
        query.push(
            { $skip: parseInt(skip) },
            { $limit: parseInt(pagedata) },
            {
                $project: {
                    firstname: 1,
                    lastname: 1,
                    email: 1,
                    mobileno: 1,
                    DOB: 1,
                    image: 1,
                    addressline1: 1,
                    addressline2: 1,
                    country: 1,
                    city: 1,
                    state: 1,
                    role: 1,
                    gender: 1,
                    postcode: 1,
                },
            }
        );

        const finalquery = [
            {
                $facet: {
                    overall: withoutlimit,
                    documentdata: query,
                },
            },
        ];

        const userData = await userSchema.aggregate(finalquery);
        console.log("userdata", withoutlimit);
        let data = userData[0].documentdata;
        let fullCount = userData[0].overall[0];

        if (data && data.length > 0) {
            res.json({
                status: 1,
                response: {
                    result: data,
                    fullcount: fullCount.counts,
                    length: data.length,
                },
            });
        } else {
            res.json({
                status: 0,
                response: {
                    result: [],
                    fullcount: fullCount,
                    length: data.length,
                },
            });
        }
    });

    const pdfdownload = catchAsync(async (req, res) => {
        (async () => {
              let userData = await userSchema.findById({_id:req.body.userId})
            // Create a browser instance
            userData = JSON.parse(JSON.stringify(userData));
            console.log("userdata",typeof(userData));

            const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });

            // Create a new page
            const page = await browser.newPage();

            //Get HTML content from HTML file
            const html = await readFile(
                path.join(dirname(fileURLToPath(import.meta.url)), '../html_pdfs', 'test.html'),
                { encoding: 'utf-8' }
            );
            let htmlfiledata = replaceVars.generateUserPDF({
                markup: html,
                userData,
              });

              let setting = await Setting.findOne({ alias: 'general' });

            //   const htmltemplate = handlebars.compile(html);

            //   const renderHTML = htmltemplate({data:userData})


              htmlfiledata = replaceVars.replaceSettingVars(htmlfiledata, userData, setting);


            await page.setContent(htmlfiledata, { waitUntil: 'domcontentloaded' });

            // To reflect CSS used for screens instead of print
            await page.emulateMediaType('screen');

            // Downlaod the PDF
            const pdf = await page.pdf({
                path: 'result.pdf',
                margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                preferCSSPageSize: true,
                printBackground: true,
                format: 'A4',
            });

            // Close the browser instance
            await browser.close();
            res.send(pdf)
        })();
     
    });

    const AdminImage = catchAsync(async (req, res) => {

        const getAttachment = (path, name) => encodeURI(path.substring(2) + name);
        // console.log("path",path,name);

        const image = getAttachment(req.files.imgdata[0].destination, req.files.imgdata[0].filename);

        let userdata = await adminimage.create({ image:image })

        console.log("imagefile", req.files)
        res.json({
            result:userdata,
            message: 'Created successfully',
          });
    })

    const getAdminImage = catchAsync(async (req, res) => {
        const adminIMAGE = await adminimage.find();
        if (!adminIMAGE) {
            throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
        }

        res.json(adminIMAGE);
    });

    function sendMail(data) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                type: "OAuth2",
                user: 'itspktechie@gmail.com',
                pass: 'PrEm@879',
    
                clientId: '900586675313-tf9tcqhmbhb7s870lifequ3q0v9ddicj.apps.googleusercontent.com',
                clientSecret: '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',
                refreshToken: '1//04D4Krt3hSZZtCgYIARAAGAQSNwF-L9IrqV5YCeSyKaCdypytw3xAlEWvcY377kczkSYgwn7jWVbz3YoHhDW3j-3a4Dm0_vyqGmY'
            }
        });
        
        const OTP = otpGenerator.generate(5, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets:false, specialChars:false });
    
        const mailConfigurations = {
            from: 'itspktechie@gmail.com',
            to: ['premkumarr393@gmail.com', data.email],
            subject: data.firstname + data.lastname + ' user register',
            html:  "<h1>hi iam pk...</h1>,<h2>your Otp is</h2>" + OTP,
            otp: OTP
        };
        transporter.sendMail(mailConfigurations, function (error, info) {
            console.log(error);
            if (error) throw new Error(error);
            console.log('Email Sent Successfully');
            console.log(info);
        });
    }

    return {
        RegisterData,
        getuser,
        getuserDetails,
        getuserdetailsById,
        updateUserDetailsById,
        deleteUserDetailById,
        aggregateUser,
        pdfdownload,
        AdminImage,
        getAdminImage
    }

}
