import { CommonBulkDeleteDto } from './../dto/common-bulk-delete.dto';
import { Entity, In, Repository } from 'typeorm';
import { filterDtoFieldsFromObject, getPaginationParameters } from 'src/utils/util.function';

export abstract class CommonService<Entity> extends Repository<Entity> {
	_repository: Repository<any>;

	constructor(private repository: any) {
		super(Entity, repository.manager, repository.queryRunner);
		this._repository = this.repository;
	}

	async _create(payload: any, relations?: any): Promise<any> {
		try {
			let { id } = await this._repository.save(payload);

			return await this._getById(id, relations);
		} catch (e) {
			throw e;
		}
	}

	async _bulkCreate(payload: any, relations?: string[]) {
		try {
			return await this._repository.manager.transaction(async (transactionalEntityManager) => {
				const save_res = await transactionalEntityManager.save(this._repository.metadata.target, payload);

				const ids = save_res.map((item: any) => item.id);

				return await transactionalEntityManager.find(this._repository.metadata.target, {
					where: { id: In([...ids]) },
					relations: relations,
				});
			});
		} catch (e) {
			throw e;
		}
	}

	async _bulkUpdate(payload: any, relations?: string[]) {
		try {
			return await this._repository.manager.transaction(async (transactionalEntityManager) => {
				let ids: string[] = [];

				for (let i = 0; i < payload.length; i++) {
					const res = await transactionalEntityManager.update(
						this._repository.metadata.target,
						payload[i].id,
						payload[i]
					);
					if (res.affected == 0) throw new Error('Update failed!');
					ids.push(payload[i].id);
				}

				return await transactionalEntityManager.find(this._repository.metadata.target, {
					where: { id: In([...ids]) },
					relations: relations,
				});
			});
		} catch (e) {
			throw e;
		}
	}

	async _bulkDelete({ ids }: CommonBulkDeleteDto) {
		try {
			return await this._repository.manager.transaction(async (transactionalEntityManager) => {
				return await transactionalEntityManager.softDelete(this._repository.metadata.target, ids);
			});
		} catch (e) {
			return e;
		}
	}

	async _filter(param: any, relations?: string[]) {
		try {
			const { take, page, skip } = getPaginationParameters(param);
			const filterParams = filterDtoFieldsFromObject(this._repository.metadata.propertiesMap, param);

			let options: any = {
				where: { ...filterParams },
				take: take,
				skip: skip,
				relations: relations,
				order: {
					updatedAt: 'DESC',
				},
			};

			const [data, count] = await this._repository.findAndCount(options);

			return { data, count, take, page };
		} catch (e) {
			throw e;
		}
	}

	async _getById(id: string, relations: any = {}) {
		try {
			return await this._repository.findOne({ where: { id }, relations });
		} catch (e) {
			throw e;
		}
	}

	async _update(id: any, payload: any, relations?: any) {
		try {
			await this._repository.update(id, payload);

			return await this._getById(id, relations);
		} catch (e) {
			throw e;
		}
	}

	async _remove(id: string | number) {
		try {
			return await this._repository.softDelete(id);
		} catch (e) {
			throw e;
		}
	}
}
