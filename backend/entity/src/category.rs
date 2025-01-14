//! `SeaORM` Entity. Generated by sea-orm-codegen 0.11.3

use sea_orm::{entity::prelude::*, Set};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "category")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub user_id: Option<i32>,
    #[sea_orm(unique)]
    pub code: String,
    pub name: String,
    pub position: i32,
    pub ancestry: Option<String>,
    pub created_at: DateTime,
    pub updated_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::post::Entity")]
    Post,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    User,
}

impl Related<super::post::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Post.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {
    fn new() -> Self {
        Self {
            position: Set(0),
            ..ActiveModelTrait::default()
        }
    }
}

impl ActiveModel {
    pub fn set_parent(&mut self, parent: Option<&Model>) {
        if let Some(parent) = parent {
            let mut ancestry = "".to_owned();
            if let Some(parent_ancestry) = &parent.ancestry {
                ancestry.push_str(&parent_ancestry)
            }
            ancestry.push_str(&format!("/{}", parent.id));
            self.ancestry = Set(Some(ancestry));
        } else {
            self.ancestry = Set(None);
        }
    }
}

impl Model {
    pub fn parent_id(&self) -> Option<i32> {
        if let Some(ancestry) = &self.ancestry {
            let last = ancestry.split("/").last();
            if let Some(last) = last {
                if let Ok(value) = last.parse::<i32>() {
                    return Some(value)
                }
            }
        }
        None
    }
}