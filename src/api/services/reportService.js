// import ReportGINSHT from "../models/reportModel.js";
// import { ReportPWD } from "../models/reportModel.js";
// import { ReportREBA } from "../models/reportModel.js";
import employeeService from "./employeeService.js";
import { GINSHT } from "../models/associations.js";
import { PVD } from "../models/associations.js";
import { REBA } from "../models/associations.js";
// import companyService from "./companyService.js";
// import Company from "../models/companyModel.js";
import { Informe } from "../models/associations.js";
import { User } from "../models/associations.js";
import { Empleado } from "../models/associations.js";
import { Empresa } from "../models/associations.js";
import { Imagen } from "../models/associations.js";
import { InformeFactor } from "../models/associations.js";
import { Factor } from "../models/associations.js";
import userService from "./userService.js";
import path from "path";
// import HttpError from "../../utils/HttpError.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertImageToBase64 = async (filePath) => {
    try {
        const imageBuffer = await fs.readFile(filePath);
        return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        throw error;
    }
};

const verificarPermisos = async (userID, empleadoID = null, empresaID = null) => {
    const user = await User.findByPk(userID);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    if (user.esTecnico === false) {
        return true; // Si es técnico, tiene acceso a todo
    }

    if (empleadoID) {
        const empleado = await employeeService.findEmployeesByUserId(empleadoID);

        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }

        const empresa = await Empresa.findByPk(empleado.ID_Empresa);
        if (!empresa) {
            throw new Error('Empresa no encontrada');
        }

        const empresasUsuario = await empresa.getUsuarios({ where: { ID: userID } });
        if (empresasUsuario.length === 0) {
            throw new Error('Usuario no tiene acceso a los informes de esta empresa');
        }
    }

    if (empresaID) {
        const empresa = await Empresa.findByPk(empresaID);
        if (!empresa) {
            throw new Error('Empresa no encontrada');
        }

        const empresasUsuario = await empresa.getUsuarios({ where: { ID: userID } });
        if (empresasUsuario.length === 0) {
            throw new Error('Usuario no tiene acceso a los informes de esta empresa');
        }
    }

    return true;
};


const reportService = {
    getReports: async (userId) => {
        try {
            // Verificar si el usuario es técnico
            const esTecnico = await userService.checkIfTechnician(userId);

            let informes;

            if (esTecnico) {
                // Obtener los informes relacionados con el usuario técnico
                informes = await Informe.findAll({
                    where: { ID_Usuario: userId },
                    include: [
                        {
                            model: User,
                            attributes: ['Nombre', 'Apellidos']
                        },
                        {
                            model: Empleado,
                            attributes: ['DNI', 'PuestoTrabajo'],
                            include: [
                                {
                                    model: Empresa,
                                    attributes: ['CIF', 'Nombre']
                                }
                            ]
                        },
                    ]
                });
            } else {
                // Obtener todos los informes de la base de datos
                informes = await Informe.findAll({

                    include: [
                        {
                            model: User,
                            attributes: ['Nombre', 'Apellidos']
                        },
                        {
                            model: Empleado,
                            attributes: ['DNI', 'PuestoTrabajo'],
                            include: [
                                {
                                    model: Empresa,
                                    attributes: ['CIF', 'Nombre']
                                }
                            ]
                        },
                        // {
                        //     model: Factor,
                        //     through: {
                        //         model: InformeFactor,
                        //         attributes: []
                        //     },
                        //     attributes: ['Descripcion']
                        // }
                    ]
                });
            }

            // Obtener los detalles específicos de cada tipo de informe
            for (let informe of informes) {
                if (informe.tipo === 'GINSHT') {
                    const ginsht = await GINSHT.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.GINSHT = ginsht;
                } else if (informe.tipo === 'PVD') {
                    const pvd = await PVD.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.PVD = pvd;
                } else if (informe.tipo === 'REBA') {
                    const reba = await REBA.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.REBA = reba;
                }
            }

            return informes;
        } catch (error) {
            console.error('Error al obtener informes:', error);
            throw error;
        }
    },
    getReportsByEmployee: async (userId, employeeId) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);

            if (esTecnico) {
                let verify = None;
                verify = await verificarPermisos(userId, employeeId);
                if (!verify) {
                    throw new Error('No tiene permisos para ver los informes de este empleado');
                }
            }
            const informes = await Informe.findAll({
                where: { ID_Empleado: employeeId },
                include: [
                    {
                        model: User,
                        attributes: ['Nombre', 'Apellidos']
                    },
                    {
                        model: Empleado,
                        attributes: ['Nombre', 'Apellidos']
                    },
                    {
                        model: Imagen,
                        attributes: ['URL']
                    },
                    {
                        model: Factor,
                        through: {
                            model: InformeFactor,
                            attributes: []
                        },
                        attributes: ['Descripcion']
                    }
                ]
            });

            // Obtener los detalles específicos de cada tipo de informe
            for (let informe of informes) {
                if (informe.tipo === 'GINSHT') {
                    const ginsht = await GINSHT.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.GINSHT = ginsht;
                } else if (informe.tipo === 'PVD') {
                    const pvd = await PVD.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.PVD = pvd;
                } else if (informe.tipo === 'REBA') {
                    const reba = await REBA.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.REBA = reba;
                }
            }

            return informes;
        } catch (error) {
            console.error('Error al obtener informes por empleado:', error);
            throw error;
        }
    },
    getReportsByCompany: async (userId, companyId) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);

            if (esTecnico) {
                let verify = None;
                verify = await verificarPermisos(userId, employeeId);
                if (!verify) {
                    throw new Error('No tiene permisos para ver los informes de este empleado');
                }
            }

            // Obtener todos los empleados de la empresa
            const empleados = employeeService.getEmployeesByCompanyId(companyId)

            // Obtener los IDs de los empleados
            const employeeIds = empleados.map(empleado => empleado.ID);

            // Obtener los informes relacionados con los empleados de la empresa
            const informes = await Informe.findAll({
                where: { ID_Empleado: employeeIds },
                include: [
                    {
                        model: User,
                        attributes: ['Nombre', 'Apellidos']
                    },
                    {
                        model: Empleado,
                        attributes: ['Nombre', 'Apellidos']
                    },
                    {
                        model: Imagen,
                        attributes: ['URL']
                    },
                    {
                        model: Factor,
                        through: {
                            model: InformeFactor,
                            attributes: []
                        },
                        attributes: ['Descripcion']
                    }
                ]
            });

            // Obtener los detalles específicos de cada tipo de informe
            for (let informe of informes) {
                if (informe.tipo === 'GINSHT') {
                    const ginsht = await GINSHT.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.GINSHT = ginsht;
                } else if (informe.tipo === 'PVD') {
                    const pvd = await PVD.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.PVD = pvd;
                } else if (informe.tipo === 'REBA') {
                    const reba = await REBA.findOne({ where: { ID: informe.ID } });
                    informe.dataValues.REBA = reba;
                }
            }

            return informes;
        } catch (error) {
            console.error('Error al obtener informes por empresa:', error);
            throw error;
        }
    },
    getReportByReference: async (reference) => {
        try {
            const informe = await Informe.findOne({
                where: { Referencia: reference },
                include: [
                    {
                        model: User,
                        attributes: ['Nombre', 'Apellidos']
                    },
                    {
                        model: Empleado,
                        attributes: ['DNI', 'PuestoTrabajo', 'Nombre', 'Apellidos', 'Sexo', 'ID'],
                        include: [
                            {
                                model: Empresa,
                                attributes: ['CIF', 'Nombre', 'ID']
                            }
                        ]
                    },
                    {
                        model: Imagen,
                        attributes: ['URL']
                    },
                    {
                        model: Factor,
                        through: {
                            model: InformeFactor,
                            attributes: []
                        },
                        attributes: ['Nombre', 'ID']
                    }

                ]
            });

            if (!informe) {
                return null;
            }

            // Convertir las imágenes a base64
            const images = await Promise.all(
                informe.Imagens.map(async (imagen) => {
                    const imagePath = path.resolve(process.cwd(), imagen.URL);
                    const base64Image = await convertImageToBase64(imagePath);
                    return { ...imagen.dataValues, base64: base64Image };
                })
            );
            // Crear un objeto personalizado con los datos del informe
            const informeData = {
                ...informe.dataValues,
                Imagens: images,
            };

            // Obtener los detalles específicos del tipo de informe y agregar al objeto personalizado
            if (informe.tipo === 'GINSHT') {
                const ginsht = await GINSHT.findOne({ where: { ID: informe.ID } });
                informeData.GINSHT = ginsht ? ginsht.dataValues : null;
            } else if (informe.tipo === 'PVD') {
                const pvd = await PVD.findOne({ where: { ID: informe.ID } });
                informeData.PVD = pvd ? pvd.dataValues : null;
            } else if (informe.tipo === 'REBA') {
                const reba = await REBA.findOne({ where: { ID: informe.ID } });
                informeData.REBA = reba ? reba.dataValues : null;
            }

            return informeData;
        } catch (error) {
            console.error('Error al obtener informe por referencia:', error);
            throw error;
        }
    },
    createReport: async (data) => {
        const { ID_Usuario, ID_Empleado, Referencia, Fecha, Indicaciones, tipo, detalles, imagenes, factores } = data;

        const transaction = await Informe.sequelize.transaction();
        try {
            // Crear el informe principal
            const informe = await Informe.create({
                ID_Usuario,
                ID_Empleado,
                Referencia,
                Fecha,
                Indicaciones,
                tipo
            }, { transaction });

            // Crear el informe específico según el tipo
            if (tipo === 'GINSHT') {
                await GINSHT.create({ ID: informe.ID, ...detalles }, { transaction });
            } else if (tipo === 'PVD') {
                await PVD.create({ ID: informe.ID, ...detalles }, { transaction });
            } else if (tipo === 'REBA') {
                await REBA.create({ ID: informe.ID, ...detalles }, { transaction });
            }

            // Manejar las imágenes asociadas
            if (imagenes && imagenes.length > 0) {
                for (let imagen of imagenes) {
                    await Imagen.create({
                        URL: imagen,
                        ID_Informe: informe.ID
                    }, { transaction });
                }
            }

            // Manejar los factores asociados
            if (factores) {
                for (const Subfactor in factores) {
                    for (const factor in factores[Subfactor]) {
                        await InformeFactor.create({
                            ID_Informe: informe.ID,
                            ID_Factor: factores[Subfactor][factor],
                            Tipo_Factor: tipo
                        }, { transaction });
                    }
                }
            }
            await transaction.commit();
            return informe;
        } catch (error) {
            await transaction.rollback();
            console.error('Error al crear el informe:', error);
            throw error;
        }
    },
    updateReport: async (id, data) => {
        const { ID_Usuario, ID_Empleado, Referencia, Fecha, Indicaciones, tipo, detalles, imagenes, factores } = data;
    
        const transaction = await Informe.sequelize.transaction();
        try {
            // Actualizar el informe principal
            const informe = await Informe.update({
                ID_Usuario,
                ID_Empleado,
                Referencia,
                Fecha,
                Indicaciones,
                tipo
            }, {
                where: { ID: id },
                transaction
            });
    
            // Actualizar el informe específico según el tipo
            if (tipo === 'GINSHT') {
                await GINSHT.update({ ...detalles }, { where: { ID: id }, transaction });
            } else if (tipo === 'PVD') {
                await PVD.update({ ...detalles }, { where: { ID: id }, transaction });
            } else if (tipo === 'REBA') {
                await REBA.update({ ...detalles }, { where: { ID: id }, transaction });
            }
    
            // Manejar las imágenes asociadas
            if (imagenes && imagenes.length > 0) {
                // Eliminar las imágenes existentes
                await Imagen.destroy({ where: { ID_Informe: id }, transaction });
    
                // Crear nuevas imágenes
                for (let imagen of imagenes) {
                    await Imagen.create({
                        URL: imagen,
                        ID_Informe: id
                    }, { transaction });
                }
            }
    
            // Manejar los factores asociados
            if (factores) {
                // Eliminar los factores existentes
                await InformeFactor.destroy({ where: { ID_Informe: id }, transaction });
    
                // Crear nuevos factores
                for (const Subfactor in factores) {
                    for (const factor in factores[Subfactor]) {
                        await InformeFactor.create({
                            ID_Informe: id,
                            ID_Factor: factores[Subfactor][factor],
                            Tipo_Factor: tipo
                        }, { transaction });
                    }
                }
            }
    
            await transaction.commit();
            return informe;
        } catch (error) {
            await transaction.rollback();
            console.error('Error al actualizar el informe:', error);
            throw error;
        }
    },
    
    // updateReport: async (reportId, data) => {
    //     const { ID_Usuario, ID_Empleado, Referencia, Fecha, Indicaciones, tipo, detalles, imagenes, factores } = data;

    //     const transaction = await Informe.sequelize.transaction();
    //     try {
    //         // Actualizar el informe principal
    //         const informe = await Informe.findByPk(reportId);
    //         if (!informe) {
    //             throw new Error('Informe no encontrado');
    //         }

    //         await informe.update({
    //             ID_Usuario,
    //             ID_Empleado,
    //             Referencia,
    //             Fecha,
    //             Indicaciones,
    //             tipo
    //         }, { transaction });

    //         // Actualizar el informe específico según el tipo
    //         if (tipo === 'GINSHT') {
    //             await GINSHT.update(detalles, { where: { ID: reportId }, transaction });
    //         } else if (tipo === 'PVD') {
    //             await PVD.update(detalles, { where: { ID: reportId }, transaction });
    //         } else if (tipo === 'REBA') {
    //             await REBA.update(detalles, { where: { ID: reportId }, transaction });
    //         }

    //         // Manejar las imágenes asociadas
    //         if (imagenes && imagenes.length > 0) {
    //             // Eliminar las imágenes antiguas
    //             await Imagen.destroy({ where: { ID_Informe: reportId }, transaction });
    //             // Crear las nuevas imágenes
    //             for (let imagen of imagenes) {
    //                 await Imagen.create({
    //                     URL: imagen.URL,
    //                     ID_Informe: reportId
    //                 }, { transaction });
    //             }
    //         }

    //         // Manejar los factores asociados
    //         if (factores && factores.length > 0) {
    //             // Eliminar las asociaciones antiguas
    //             await InformeFactor.destroy({ where: { ID_Informe: reportId }, transaction });
    //             // Crear las nuevas asociaciones
    //             for (let factorId of factores) {
    //                 await InformeFactor.create({
    //                     ID_Informe: reportId,
    //                     ID_Factor: factorId
    //                 }, { transaction });
    //             }
    //         }

    //         await transaction.commit();
    //         return informe;
    //     } catch (error) {
    //         await transaction.rollback();
    //         console.error('Error al actualizar el informe:', error);
    //         throw error;
    //     }
    // },

    deleteReportByReferencia: async (reference) => {
        const transaction = await Informe.sequelize.transaction();
        try {
            // Buscar el informe por su referencia
            const informe = await Informe.findOne({ where: { Referencia: reference } });
            if (!informe) {
                throw new Error('Informe no encontrado');
            }

            // Eliminar las asociaciones específicas del tipo de informe
            if (informe.tipo === 'GINSHT') {
                await GINSHT.destroy({ where: { ID: informe.ID }, transaction });
            } else if (informe.tipo === 'PVD') {
                await PVD.destroy({ where: { ID: informe.ID }, transaction });
            } else if (informe.tipo === 'REBA') {
                await REBA.destroy({ where: { ID: informe.ID }, transaction });
            }

            // Eliminar las imágenes asociadas
            await Imagen.destroy({ where: { ID_Informe: informe.ID }, transaction });

            // Eliminar las asociaciones de factores
            await InformeFactor.destroy({ where: { ID_Informe: informe.ID }, transaction });

            // Eliminar el informe principal
            await informe.destroy({ transaction });

            await transaction.commit();
            return { message: 'Informe eliminado exitosamente' };
        } catch (error) {
            await transaction.rollback();
            console.error('Error al eliminar el informe:', error);
            throw error;
        }
    },

    deleteReport: async (reportId) => {
        const transaction = await Informe.sequelize.transaction();
        try {
            // Buscar el informe por su ID
            const informe = await Informe.findByPk(reportId);
            if (!informe) {
                throw new Error('Informe no encontrado');
            }

            // Eliminar las asociaciones específicas del tipo de informe
            if (informe.tipo === 'GINSHT') {
                await GINSHT.destroy({ where: { ID: reportId }, transaction });
            } else if (informe.tipo === 'PVD') {
                await PVD.destroy({ where: { ID: reportId }, transaction });
            } else if (informe.tipo === 'REBA') {
                await REBA.destroy({ where: { ID: reportId }, transaction });
            }

            // Eliminar las imágenes asociadas
            await Imagen.destroy({ where: { ID_Informe: reportId }, transaction });

            // Eliminar las asociaciones de factores
            await InformeFactor.destroy({ where: { ID_Informe: reportId }, transaction });

            // Eliminar el informe principal
            await informe.destroy({ transaction });

            await transaction.commit();
            return { message: 'Informe eliminado exitosamente' };
        } catch (error) {
            await transaction.rollback();
            console.error('Error al eliminar el informe:', error);
            throw error;
        }
    },

};

export default reportService;